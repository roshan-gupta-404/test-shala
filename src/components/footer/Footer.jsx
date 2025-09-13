import { CiLinkedin } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import Container from "../Container";
import { Link } from "react-router-dom";

function Footer() {
  const iconsTab = [
    { icon: <CiLinkedin />, name: 'linkedIn',url:'https://www.linkedin.com/in/roshan-gupta-2611792a3/' },
    { icon: <LuGithub />, name: 'github',url:'https://github.com/roshan-gupta-404' }
  ];

  return (
    <>
      <footer id="footer" className="p-4 border-t bg-white text-black border-t-black">
        <Container>
          <div className="flex flex-col-reverse sm:flex-row sm justify-between items-center  bottom-0 px-4">
            <div>
              <p className="text-center"> &copy; 2024 Test Shala. All rights reserved.</p>
            </div>
            <div className="flex justify-around">
              {iconsTab.map((item) => {
                return (
                  <div className="text-3xl sm:text-5xl mx-2 hover:text-orange-200 duration-300"
                    key={item.name}
                  >
                  <Link to={item.url}>
                    {item.icon}
                  </Link>
                  </div>
                )
              })}
            </div>
          </div>

        </Container>


      </footer>
    </>
  );
}
 
export default Footer;
