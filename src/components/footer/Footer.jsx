import { CiLinkedin } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import Container from "../Container";
import { BookOpen } from "lucide-react";

function Footer() {
  const iconsTab = [
    { icon: <CiLinkedin />, name: 'linkedIn', url: 'https://www.linkedin.com/in/roshan-gupta-2611792a3/' },
    { icon: <LuGithub />, name: 'github', url: 'https://github.com/roshan-gupta-404' }
  ];

  return (
    <>
      <Container>
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="">
              <div className="flex flex-col justify-center items-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">TestShala</h3>
                </div>
                <p className="text-gray-400 max-w-md text-center">
                  Empowering students with comprehensive test preparation tools and practice materials for various competitive exams.
                </p>
              </div>
              {/* <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Tests</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Results</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">About</a></li>
                </ul>
              </div> */}
              {/* <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div> */}
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 TestShala. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </Container>
    </>
  );
}

export default Footer;
