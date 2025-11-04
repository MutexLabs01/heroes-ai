import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Eye,
  Download,
  Shield,
  ShoppingCart,
  Lock,
  Users,
  Calendar,
  Heart,
  MessageSquare,
  Image as ImageIcon,
  BookOpen,
  Globe,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { marketplaceItems } from '../data/mockData';

interface ItemDetailProps {
  cart: any[];
  setCart: (cart: any[]) => void;
}

/* -------------------- helpers -------------------- */

function timeAgo(iso?: string | Date) {
  try {
    const d = iso ? new Date(iso) : new Date(Date.now() - 1000 * 60 * 60 * 18);
    const diff = Math.max(0, Date.now() - d.getTime());
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) {
      const rem = mins % 60;
      return `${hours} hour${hours > 1 ? 's' : ''}, ${rem} minute${rem !== 1 ? 's' : ''} ago`;
    }
    return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  } catch {
    return 'recently';
  }
}

const Badge = ({
  children,
  tone = 'neutral',
  title,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'blue' | 'green';
  title?: string;
}) => {
  const tones = {
    neutral: 'bg-gray-900/60 text-gray-200 border border-gray-800',
    blue: 'bg-blue-600/15 text-blue-300 border border-blue-500/30',
    green: 'bg-emerald-600/15 text-emerald-300 border border-emerald-500/30',
  };
  return (
    <span
      title={title}
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${tones[tone]} backdrop-blur-sm`}
    >
      {children}
    </span>
  );
};

// colored tag chip
const Chip = ({ text, tone = 'neutral' }: { text: string; tone?: 'neutral' | 'blue' | 'green' | 'purple' }) => {
  const tones = {
    neutral: 'bg-gray-900/60 text-gray-200 border border-gray-800',
    blue: 'bg-blue-600/15 text-blue-300 border border-blue-500/30',
    green: 'bg-emerald-600/15 text-emerald-300 border border-emerald-500/30',
    purple: 'bg-fuchsia-600/15 text-fuchsia-300 border border-fuchsia-500/30',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${tones[tone]} whitespace-nowrap`}>
      {text}
    </span>
  );
};

// tag tone by meaning
function toneFor(tag: string): 'neutral' | 'blue' | 'green' | 'purple' {
  const t = tag.toLowerCase();
  if (['adopt', 'adoptable', 'ufo', 'up for offer', 'ota', 'offer to adopt'].includes(t)) return 'green';
  if (['for offer', 'offer'].includes(t)) return 'blue';
  if (['shapeshifter', 'magic', 'ability', 'power'].includes(t)) return 'purple';
  return 'neutral';
}

/* -------------------- component -------------------- */

const ItemDetail: React.FC<ItemDetailProps> = ({ cart, setCart }) => {
  const { id } = useParams();
  const location = useLocation();
  const [selectedLicense, setSelectedLicense] = useState<'non-exclusive' | 'exclusive'>('non-exclusive');
  const [showCheckout, setShowCheckout] = useState(false);

  const item = marketplaceItems.find((it) => it.id === parseInt(id || '0', 10));

  // Toyhou.se-style meta, with safe defaults
  const favorites = (item as any)?.favorites ?? 0;
  const createdAt = (item as any)?.createdAt;
  const tradeListing = (item as any)?.tradeListing ?? {
    forSale: true,
    currencyLabel: 'Real Currency',
    forOffer: true,
  };

  // NORMALIZED TAGS (short, marketplace-friendly)
  const rawTags: string[] =
    (item as any)?.tags ??
    ['Bird', 'Feline', 'Corvid', 'Shapeshifter', 'Adoptable', 'Offer to Adopt', 'Up for Offer'];
  // ensure nice casing & dedupe
  const tags = Array.from(new Set(rawTags.map(t => t.trim()).filter(Boolean)));

  // >>> new: Overview text replaces the old "Profile" <<<
  const overviewText =
    'A mysterious vigilante who operates in the shadows of Neo-Tokyo. This comprehensive character pack includes a detailed backstory, personality traits, combat abilities, and polished artwork. Perfect for cyberpunk stories, urban-fantasy settings, or graphic-novel projects — the Shadow Warrior adds depth and intrigue to any narrative.';

  // bottom profile/pinglist removed per request

  const recentImages: string[] = (item as any)?.recentImages ?? (item?.image ? [item.image] : []);
  const counts = (item as any)?.counts ?? { gallery: recentImages.length || 1, comments: (item as any)?.comments ?? 26 };

  // active anchor in sidebar
  const [activeAnchor, setActiveAnchor] = useState<string>(location.hash || '#overview');
  useEffect(() => setActiveAnchor(location.hash || '#overview'), [location.hash]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item not found</h2>
          <Link to="/marketplace" className="text-red-400 hover:text-red-300">
            Return to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const handlePurchase = () => setShowCheckout(true);
  const addToCart = () => setCart([...cart, { ...item, license: selectedLicense }]);

  const licenseOptions = [
    {
      type: 'non-exclusive' as const,
      name: 'Non-Exclusive License',
      price: item.price,
      description: 'Use in commercial work for clients or personal projects. Others may also license this asset.',
      features: ['Commercial use allowed', 'Attribution required', 'Resale not permitted'],
    },
    {
      type: 'exclusive' as const,
      name: 'Exclusive License',
      price: item.price * 3,
      description: 'Full commercial exclusivity. Asset is removed from general licensing.',
      features: ['Exclusive commercial rights', 'No attribution required', 'Full ownership rights'],
    },
  ];
  const selectedLicenseData = licenseOptions.find((l) => l.type === selectedLicense)!;
  const createdAgo = useMemo(() => timeAgo(createdAt), [createdAt]);

  /* small UI helpers */
  const Card = ({ 
    children, 
    className = '', 
    onClick,
    onKeyDown,
    ...props 
  }: { 
    children: React.ReactNode; 
    className?: string;
    onClick?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    [key: string]: any;
  }) => (
    <div 
      className={`bg-gray-950/60 border border-gray-800 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </div>
  );

  const NavItem = ({
    href,
    icon,
    label,
    count,
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    count?: string | number;
  }) => {
    const active = activeAnchor === href;
    return (
      <a
        href={href}
        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${
          active ? 'bg-gray-900/70 text-white' : 'hover:bg-gray-900/50 text-gray-200'
        }`}
      >
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span className="text-gray-400">{count ?? '—'}</span>
      </a>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-20 self-start">
            <Card>
              <div className="px-4 py-3 font-semibold border-b border-gray-800">Character</div>
              <nav className="p-2 space-y-1 text-sm">
                <NavItem href="#overview" icon={<BookOpen className="h-4 w-4" />} label="Overview" />
                <NavItem href="#gallery" icon={<ImageIcon className="h-4 w-4" />} label="Gallery" count={counts.gallery ?? 1} />
                <NavItem href="#library" icon={<BookOpen className="h-4 w-4" />} label="Library" />
                <NavItem href="#worlds" icon={<Globe className="h-4 w-4" />} label="Worlds" />
                <NavItem href="#links" icon={<LinkIcon className="h-4 w-4" />} label="Links" />
                <NavItem href="#comments" icon={<MessageSquare className="h-4 w-4" />} label="Comments" count={counts.comments ?? 0} />
                <NavItem href="#ownership" icon={<Users className="h-4 w-4" />} label="Ownership" />
              </nav>
            </Card>
          </aside>

          {/* Main column */}
          <div>
            {/* Back */}
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors mb-4 rounded-md focus-visible:ring-2 focus-visible:ring-red-600"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Marketplace
            </Link>

            {/* Title & meta */}
            <div className="flex flex-col gap-3 mb-4">
              <h1 className="text-3xl md:text-[34px] font-extrabold leading-tight tracking-tight">
                {item.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2">
                <Badge title="Created">{`Created ${createdAgo}`}</Badge>
                <Badge title="Creator">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> @{item.creator?.name || 'creator'}
                  </span>
                </Badge>
                <Badge title="Favorites">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" /> {favorites}
                  </span>
                </Badge>
                {tradeListing.forSale && (
                  <Badge tone="green">{`For Sale (${tradeListing.currencyLabel || 'Real Currency'})`}</Badge>
                )}
                {tradeListing.forOffer && <Badge tone="blue">For Offer</Badge>}
              </div>

              {/* Colored Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Chip key={t} text={t} tone={toneFor(t)} />
                ))}
              </div>
            </div>

            {/* Overview (moved up, replaces bottom Profile) */}
            <section id="overview" className="mb-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <p className="text-gray-200 text-[15px] leading-relaxed max-w-3xl">
                  {overviewText}
                </p>
              </Card>
            </section>

            {/* Two-column content */}
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Media */}
              <div id="gallery">
                <Card className="overflow-hidden mb-6 transition-transform duration-200 will-change-transform hover:-translate-y-0.5">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-96 object-cover"
                      loading="eager"
                    />
                    {!item.purchased && (
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="h-12 w-12 text-red-400 mx-auto mb-3" />
                          <p className="text-white font-semibold text-sm md:text-base">Purchase to unlock full content</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Creator */}
                <Card className="p-5">
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={item.creator.avatar}
                      alt={item.creator.name}
                      className="w-12 h-12 rounded-full ring-1 ring-gray-800"
                    />
                    <div>
                      <h3 className="font-semibold">{item.creator.name}</h3>
                      <p className="text-gray-400 text-sm">{item.creator.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-[15px] leading-relaxed">
                    {item.creator.bio}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-4 w-4" /> {item.creator.followers} followers
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Joined {item.creator.joinDate}
                    </span>
                  </div>
                </Card>
              </div>

              {/* Sticky purchase/description */}
              <div className="lg:sticky lg:top-20">
                <div className="mb-5 flex items-center justify-between">
                  <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      {item.rating}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {item.views} views
                    </span>
                    <span>{item.sales} sales</span>
                  </div>
                </div>

                {/* License cards */}
                <div className="space-y-4">
                  {licenseOptions.map((license) => {
                    const active = selectedLicense === license.type;
                    return (
                      <Card
                        key={license.type}
                        className={`p-5 border ${
                          active ? 'border-red-600 bg-red-600/10' : 'border-red-900/20 hover:border-red-600/50'
                        } cursor-pointer transition-colors`}
                        onClick={() => setSelectedLicense(license.type)}
                        aria-label={`Choose ${license.name}`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && setSelectedLicense(license.type)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{license.name}</h4>
                          <div className="text-xl font-bold text-red-500">${license.price}</div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{license.description}</p>
                        <ul className="text-sm text-gray-400 space-y-1">
                          {license.features.map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <Check className="h-4 w-4" aria-hidden /> {f}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-4">
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl text-lg font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-red-600"
                    aria-label="Buy now"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Buy Now - ${selectedLicenseData.price}
                    </span>
                  </button>

                  <button
                    onClick={addToCart}
                    className="w-full border border-red-600 text-red-400 hover:bg-red-600/10 py-4 px-6 rounded-xl text-lg font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-red-600"
                    aria-label="Add to cart"
                  >
                    Add to Cart
                  </button>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Shield className="h-4 w-4" />
                    Secure payment processed by Stripe
                  </div>
                </div>

                {/* What's Included */}
                <Card className="mt-8 p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-red-400" />
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {item.includes.map((include, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>{include}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Recent Images */}
            <section id="recent-images" className="mt-10">
              <h2 className="text-xl font-semibold mb-3">Recent Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentImages.length === 0 && <div className="text-sm text-gray-400">No images yet.</div>}
                {recentImages.map((src, idx) => (
                  <Card key={`${src}-${idx}`} className="overflow-hidden aspect-square">
                    <img src={src} alt={`recent-${idx}`} className="w-full h-full object-cover" loading="lazy" />
                  </Card>
                ))}
              </div>
            </section>

            {/* Anchored sections */}
            <div id="library" className="mt-10">
              <h3 className="text-lg font-semibold mb-2">Library</h3>
              <p className="text-sm text-gray-400">No entries yet.</p>
            </div>
            <div id="worlds" className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Worlds</h3>
              <p className="text-sm text-gray-400">No worlds linked.</p>
            </div>
            <div id="links" className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Links</h3>
              <p className="text-sm text-gray-400">No external links.</p>
            </div>
            <div id="comments" className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Comments ({counts.comments ?? 0})</h3>
              <p className="text-sm text-gray-400">Comments module coming soon.</p>
            </div>
            <div id="ownership" className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Ownership</h3>
              <p className="text-sm text-gray-400">Owned by {item.creator?.name ?? 'creator'}.</p>
            </div>

            {/* Checkout Modal */}
            {showCheckout && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <Card className="w-full max-w-md p-6 border border-red-900/20">
                  <h3 className="text-2xl font-bold mb-6">Complete Purchase</h3>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{item.title}</span>
                      <span className="font-semibold">${selectedLicenseData.price}</span>
                    </div>
                    <div className="text-sm text-gray-400">{selectedLicenseData.name}</div>
                  </div>
                  <div className="text-center text-gray-400 mb-6">
                    <p>This will redirect to Stripe Checkout</p>
                    <p className="text-sm mt-2">Secure payment processing</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="flex-1 border border-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-red-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-600">
                      Continue to Payment
                    </button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;