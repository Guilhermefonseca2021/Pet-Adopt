import { Helmet } from "react-helmet";


export default function About() {
  return (
     <section className="bg-gray-50 text-gray-800 px-4 py-12">
      <Helmet title="Sobre" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-2">Sobre Nós</h1>
          <p className="text-lg text-gray-600">
            Conectando lares vazios a corações que esperam por amor.
          </p>
        </div>

        <div className="space-y-12">
          {/* Missão */}
          <div>
            <h2 className="text-2xl font-semibold text-purple-600">Nossa Missão</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Em muitos estados do Brasil, abrigos enfrentam o desafio de cuidar de centenas de animais abandonados.
              Ao mesmo tempo, em outras regiões, há lares prontos para adotar — mas sem animais disponíveis.
              O <strong>Center Petshop</strong> nasceu para conectar esses dois mundos.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
              <li>Reduzir o abandono e superlotação dos abrigos.</li>
              <li>Facilitar adoções entre diferentes estados.</li>
              <li>Educar sobre a posse responsável de pets.</li>
            </ul>
          </div>

          {/* Por que adotar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-purple-600">Por Que Adotar?</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Adotar é um ato de empatia. Ao acolher um animal:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
              <li>Você salva uma vida.</li>
              <li>Libera espaço para que outro animal possa ser resgatado.</li>
              <li>Ganha um companheiro leal e afetuoso.</li>
              <li>Combate o comércio irresponsável de animais.</li>
            </ul>
          </div>

          {/* Realidade de contrastes */}
          <div>
            <h2 className="text-2xl font-semibold text-purple-600">Uma Realidade de Contrastes</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Enquanto estados como <strong>Bahia, Pernambuco e Ceará</strong> lutam com superlotação de abrigos e poucos adotantes,
              outras regiões mais ao sul e sudeste contam com pessoas dispostas a adotar, mas sem animais disponíveis.
              Nosso site nasce como uma ponte entre esses extremos.
            </p>
          </div>

          {/* Como atuamos */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-purple-600">Como Atuamos</h2>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
              <li>Catalogamos animais disponíveis para adoção em diversos estados.</li>
              <li>Verificamos as condições de saúde e segurança dos pets.</li>
              <li>Facilitamos o contato entre adotantes e protetores de confiança.</li>
              <li>Orientamos sobre transporte responsável entre cidades e estados.</li>
            </ul>
          </div>

          {/* Chamada final */}
          <div className="text-center mt-8">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">Junte-se a Nós</h3>
            <p className="text-gray-700 max-w-xl mx-auto leading-relaxed">
              Seja adotante, voluntário, ONG parceira ou doador — seu apoio é essencial.
              Vamos juntos transformar a vida desses animais e mostrar que todo pet merece um lar,
              <strong> independente de onde ele esteja</strong>.
            </p>
            <p className="mt-4 font-medium text-purple-700 italic">
              Porque onde há amor, não existem distâncias.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
