import profile from "../../data/profile";

function HeroContent() {
  return (
    <>
      <p className="text-blue-500 font-semibold">
        Hello, I'm
      </p>

      <h1 className="text-6xl font-bold mt-3">
        {profile.name}
      </h1>

      <h2 className="text-2xl text-gray-500 mt-4">
        {profile.title}
      </h2>

      <p className="mt-6 text-gray-600 leading-8">
        {profile.description}
      </p>
    </>
  );
}

export default HeroContent;