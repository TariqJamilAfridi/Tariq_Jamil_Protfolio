import Button from "../common/Button/Button";
import CV from "../../assets/resume/CV.pdf";
function HeroButtons() {
  return (
    <div className="flex gap-4 mt-8">
      <Button className="bg-blue-600 text-white hover:bg-blue-700">
        Hire Me
      </Button>

      
    <a href={CV} download>
        <Button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
        Download Resume
        </Button>
    </a>
      
    </div>
  );
}

export default HeroButtons;
