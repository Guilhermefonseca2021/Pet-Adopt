import { NavLink } from "react-router-dom";

type Card = {
  id: string;
  number: number;
  imgUrl: string;
  title: string;
  description: string;
};

export default function Cardpet({ id, number, imgUrl, title, description }: Card) {
  return (
    <div className="relative bg-white border rounded-lg shadow-md  dark:border-gray-700 transform transition duration-500 hover:scale-105">
      <NavLink to={`/adopt/${id}`} className="block">
      <div className="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
        {number}
      </div>
      <div className="p-2 flex justify-center">
        <a href="#">
          <img className="rounded-md" src={imgUrl} loading="lazy" />
        </a>
      </div>

      <div className="px-4 pb-3">
        <div>
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-600  ">
              {title}
            </h5>
          </a>

          <p className="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
            {description}
          </p>
        </div>
      </div>
      </NavLink>
    </div>
  );
}
