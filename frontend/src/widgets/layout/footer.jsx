import { Typography } from "@material-tailwind/react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2 ">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, This project is proudly crafted by{" "}
          <a
            href="https://saihtet.netlify.app/"
            target="_blank"
            className="transition-colors hover:text-blue-500"
          >
            <strong>Sai Htet Wai Yan</strong>
          </a>{" "}
          using from{" "}
          <a
            href="https://www.creative-tim.com/"
            target="_blank"
            className="transition-colors hover:text-blue-500"
          >
            <strong>Creative Tim</strong>
          </a>{" "}
          for a better web experience.
        </Typography>
      </div>
    </footer>
  );
}

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
