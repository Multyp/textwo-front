/* Global imports */
import Image from 'next/image';
/* Scoped imports */
/* Local imports */

const DeveloperSection = () => {
  return (
    <section className="bg-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">About the Developer</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <Image
                src="/Miguel.jpg"
                alt="Miguel Da Silva"
                width={512}
                height={512}
                className="rounded-full w-80 h-80"
              />
            </div>
            <div className="md:w-2/3">
              <p className="text-base text-gray-700">
                I{"'"}m Miguel Da Silva, the main developer behind TexTwo. With a passion for coding and a drive to create innovative solutions, I strive to deliver the best user experience possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
