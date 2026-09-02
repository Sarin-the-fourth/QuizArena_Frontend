import { SearchAlert } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

type EmptyDataProps = {
  title: string;
  description: string;
};

const EmptyData = ({ title, description }: EmptyDataProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchAlert />
        </EmptyMedia>
        <EmptyTitle className="font-Outfit">{title}</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription className="font-Outfit">
          {description}
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyData;
