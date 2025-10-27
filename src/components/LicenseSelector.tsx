import React from 'react';

interface LicenseOption {
  type: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

interface LicenseSelectorProps {
  price: number;
  selectedLicense: string;
  setSelectedLicense: (s: string) => void;
}

const LicenseSelector: React.FC<LicenseSelectorProps> = ({ price, selectedLicense, setSelectedLicense }) => {
  const licenseOptions: LicenseOption[] = [
    {
      type: 'non-exclusive',
      name: 'Non-Exclusive License',
      price,
      description: 'Use in commercial projects. Others can also license this content.',
      features: ['Commercial use allowed', 'Attribution required', 'Resale not permitted']
    },
    {
      type: 'exclusive',
      name: 'Exclusive License',
      price: price * 3,
      description: 'Exclusive rights to this content. No one else can license it.',
      features: ['Exclusive commercial rights', 'No attribution required', 'Full ownership rights']
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Choose Your License</h3>
      <div className="space-y-4">
        {licenseOptions.map(license => (
          <div
            key={license.type}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedLicense === license.type
                ? 'border-red-600 bg-red-600/10'
                : 'border-red-900/20 hover:border-red-600/50'
            }`}
            onClick={() => setSelectedLicense(license.type)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{license.name}</h4>
              <div className="text-xl font-bold text-red-500">${license.price}</div>
            </div>
            <p className="text-gray-300 text-sm mb-3">{license.description}</p>
            <ul className="text-sm text-gray-400 space-y-1">
              {license.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LicenseSelector;
