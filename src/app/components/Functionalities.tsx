import Image from "next/image";
import Tilt from "react-parallax-tilt";

export async function Functionalities() {
  const cardContainerStyle = `
    bg-neutral-900 border border-neutral-800 rounded-3xl 
    flex flex-col gap-5 items-center justify-center z-10
    px-16 py-12 h-full
  `;
  const titleStyle = "font-bold text-lg text-center";
  const paragraphStyle = "text-md text-center max-w-80 text-gray-50";

  return (
    <section
      className={`
        flex flex-col items-center
        bg-neutral-950 px-40 py-20 gap-14
      `}
    >
      <h1 className="text-gray-50 text-4xl">
        Libere o potencial do trabalho em equipe!
      </h1>

      <div className="flex flex-center justify-center gap-24 relative">
        <span
          className={`
              absolute w-full h-72 bg-emerald-500 self-center rounded-full
              opacity-10 blur-3xl z-0
            `}
        />

        <Tilt>
          <div className={cardContainerStyle}>
            <Image
              src="/images/customization.svg"
              alt=""
              width={218}
              height={215.033}
            />

            <div className="flex flex-col items-center gap-2">
              <h1 className={`${titleStyle} text-red-500`}>
                Personalização de Grupos
              </h1>
              <p className={paragraphStyle}>
                Adapte seus grupos de tarefas ao seu gosto atravez dos recursos
                de personalização
              </p>
            </div>
          </div>
        </Tilt>

        <Tilt>
          <div className={cardContainerStyle}>
            <div className="flex flex-col items-center gap-2">
              <h1 className={`${titleStyle} text-blue-500`}>
                Grupos de Tarefas
              </h1>
              <p className={paragraphStyle}>
                Explore tarefas colaborativas em grupos abertos e privados, para
                contribuir com o sucesso coletivo
              </p>
            </div>

            <Image
              src="/images/task-groups.svg"
              alt=""
              width={267}
              height={154.417}
            />
          </div>
        </Tilt>

        <Tilt>
          <div className={cardContainerStyle}>
            <Image
              src="/images/ranking.svg"
              alt=""
              width={223}
              height={231.967}
            />

            <div className="flex flex-col items-center gap-2">
              <h1 className={`${titleStyle} text-yellow-500`}>
                Sistema de Pontos e Recompensas
              </h1>
              <p className={paragraphStyle}>
                Ganhe pontos ao realizar tarefas e participe de recompensas
                incríveis definidas pelos líderes do grupo
              </p>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}
