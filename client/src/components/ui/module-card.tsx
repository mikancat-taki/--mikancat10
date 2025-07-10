import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  tags?: string[];
}

export function ModuleCard({ title, description, icon: Icon, href, color, tags }: ModuleCardProps) {
  return (
    <Link href={href}>
      <Card className={`cursor-pointer hover:shadow-xl transition-shadow border-l-4 ${color}`}>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color.replace('border-', 'bg-')}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold ml-3">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          {tags && (
            <div className="flex flex-wrap gap-1 text-xs">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
