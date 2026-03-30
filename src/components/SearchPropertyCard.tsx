import { MapPin, Clock, Heart, Trash2, Plus } from "lucide-react";

interface SearchPropertyCardProps {
  image: string;
  title: string;
  address: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  date1?: string;
  price1?: string;
  date2?: string;
  price2?: string;
  tags: string[];
  closingDate?: string;
}

const SearchPropertyCard = ({
  image,
  title,
  address,
  price,
  oldPrice,
  discount,
  date1,
  price1,
  date2,
  price2,
  tags,
  closingDate,
}: SearchPropertyCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {closingDate && (
          <div className="absolute bottom-0 left-0 right-0 bg-coral/90 text-accent-foreground text-xs font-semibold px-3 py-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Data de encerramento: {closingDate}
          </div>
        )}
        {discount && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="text-[10px]">↓</span> {discount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-border text-foreground text-[10px] font-medium px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mb-2">
          <span className="font-heading font-bold text-xl text-coral">{price}</span>
          {oldPrice && (
            <span className="text-muted-foreground text-xs line-through ml-2">{oldPrice}</span>
          )}
        </div>

        {/* Dashed separator */}
        <div className="border-t border-dashed border-border mb-2" />

        {/* Title */}
        <h3 className="font-heading font-semibold text-sm text-foreground mb-1 line-clamp-2">
          {title}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-1 mb-3">
          <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground line-clamp-2">{address}</p>
        </div>

        {/* Auction dates */}
        {(date1 || date2) && (
          <div className="space-y-1 mt-auto">
            {date1 && price1 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">1ª Praça: {date1}</span>
                <span className="font-heading font-bold text-foreground">{price1}</span>
              </div>
            )}
            {date2 && price2 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">2ª Praça: {date2}</span>
                <span className="font-heading font-bold text-coral">{price2}</span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-primary hover:bg-secondary transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-primary hover:bg-secondary transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-primary hover:bg-secondary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPropertyCard;
