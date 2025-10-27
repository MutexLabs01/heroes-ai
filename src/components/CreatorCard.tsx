import React from 'react';
import { Users, Calendar } from 'lucide-react';

interface CreatorCardProps {
  creator: any;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  return (
    <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{creator.name}</h3>
          <p className="text-gray-400 text-sm">{creator.title}</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm">{creator.bio}</p>
      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{creator.followers} followers</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>Joined {creator.joinDate}</span>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
