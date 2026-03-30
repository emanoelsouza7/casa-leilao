import { MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id?: string;
  image: string;
  title: string;
  address: string;
  price?: string;
  oldPrice?: string;
  discount?: string;
  price1?: string;
  date1?: string;
  price2?: string;
  date2?: string;
  tags: string[];
}

const PropertyCard = ({
  id,
  image,
  title,
  address,
  discount,
  price1,
  date1,
  price2,
  date2,
  tags,
}: PropertyCardProps) => {
  const content = (
    <div className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-border">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        {discount && (
          <div className="absolute top-3 right-3 bg-coral text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-lg">
            {discount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-1 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-start gap-1 mb-3">
          <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground line-clamp-2">{address}</p>
        </div>

        {(date1 || date2) && (
          <div className="space-y-2 border-t border-border pt-3">
            {date1 && price1 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">1ª Praça: {date1}</span>
                </div>
                <span className="font-heading font-bold text-sm text-primary">{price1}</span>
              </div>
            )}
            {date2 && price2 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">2ª Praça: {date2}</span>
                </div>
                <span className="font-heading font-bold text-sm text-coral">{price2}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (id) {
    return <Link to={`/imovel/${id}`}>{content}</Link>;
  }

  return content;
};

export default PropertyCard;
