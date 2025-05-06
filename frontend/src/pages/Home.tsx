import { Helmet } from "react-helmet";
import Cardpet from "../components/Cardpet";

export default function Home() {
  return (
    <div className="h-full flex w-full justify-center items-center p-2">
      <Helmet title="Pets" />
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <Cardpet
            id={index.toString()}
            key={index}
            number={12}
            imgUrl="https://tse3.mm.bing.net/th?id=OIP.VC4ntcRkTZgODtI0lBd-RAAAAA&pid=Api&P=0&h=180"
            title="Husky da raca coitado"
            description="veio da coitadolandia, quero doar."
          />
        ))}
      </div>
    </div>
  );
}
