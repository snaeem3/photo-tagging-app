import gitHubIcon from '../images/icons/github.svg';

const Footer = (props) => (
  <footer>
    Site by Sameer N
    <a
      href="https://github.com/snaeem3"
      className="clickable"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="icon gitHub clickable"
        alt="github icon"
        src={gitHubIcon}
      />
    </a>
  </footer>
);

export default Footer;
