import { Helmet } from "react-helmet";
import Cardpet from "../components/cardpet";

export default function Home() {
  return (
    <div className="h-full flex w-full justify-center items-center dark:bg-gray-800 p-2">
      <Helmet title="Pets" />
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
        {Array.from({ length: 23 }).map((_, index) => (
          <Cardpet
            number={24}
            imgUrl="https://tailwindflex.com/public/images/thumbnails/coming-soon-page/thumb_u.min.webp"
            title="card"
            description="this component"
          />
        ))}
      </div>
    </div>
  );
}
