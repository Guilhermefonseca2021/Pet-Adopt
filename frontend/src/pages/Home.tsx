import { Helmet } from "react-helmet";
import Cardpet from "../components/Cardpet";

export default function Home() {
  return (
    <div className="h-full flex w-full flex-start items-center p-2">
      <Helmet title="Pets" />
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"> 
        {Array.from({ length: 14 }).map((_, index) => (
          <Cardpet
            id={index.toString()}
            key={index}
            number={index}
            imgUrl="https://tse3.mm.bing.net/th?id=OIP.VC4ntcRkTZgODtI0lBd-RAAAAA&pid=Api&P=0&h=180"
            title="Husky"
            description="veio da coitadolandia"
          />
        ))}
      </div>
    </div>
  );
}
