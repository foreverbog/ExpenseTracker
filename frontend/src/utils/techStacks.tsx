import { ReactElement } from "react";
import { MdBarChart } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { BsCurrencyExchange } from "react-icons/bs";
import { RiShieldUserLine } from "react-icons/ri";
import { AiOutlinePieChart } from "react-icons/ai";
import { IoColorPaletteOutline } from "react-icons/io5";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

type FeaturesType = {
  icon: ReactElement;
  name: string;
  description: string;
  color: string;
};

type TechType = {
  icon: ReactElement;
  name: string;
};

export const features: FeaturesType[] = [
  {
    icon: <MdBarChart />,
    name: "Feature1",
    description: "Feature1Description",
    color: "text-blue-600",
  },
  {
    icon: <TbBeach />,
    name: "Feature2",
    description: "Feature2Description",
    color: "text-amber-500",
  },
  {
    icon: <BsCurrencyExchange />,
    name: "Feature3",
    description: "Feature3Description",
    color: "text-green-500",
  },
  {
    icon: <RiShieldUserLine />,
    name: "Feature4",
    description: "Feature4Description",
    color: "text-red-500",
  },
  {
    icon: <AiOutlinePieChart />,
    name: "Feature5",
    description: "Feature5Description",
    color: "text-lime-400",
  },
  {
    icon: <IoColorPaletteOutline />,
    name: "Feature6",
    description: "Feature6Description",
    color: "text-indigo-600",
  },
];

export const frontStack: TechType[] = [
  {
    icon: <SiReact className="text-[#61DAFB]" />,
    name: "React",
  },

  {
    icon: <SiTypescript className="text-[#3178C6]" />,
    name: "TypeScript",
  },
  {
    icon: <SiTailwindcss className="text-[#06B6D4]" />,
    name: "TailwindCSS",
  },
  {
    icon: (
      <svg
        className="w-6"
        viewBox="0 0 410 404"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="6.00017"
            y1="32.9999"
            x2="235"
            y2="344"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#41D1FF" />
            <stop offset="1" stop-color="#BD34FE" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="194.651"
            y1="8.81818"
            x2="236.076"
            y2="292.989"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFEA83" />
            <stop offset="0.0833333" stop-color="#FFDD35" />
            <stop offset="1" stop-color="#FFA800" />
          </linearGradient>
        </defs>
      </svg>
    ),
    name: "Vite",
  },
  {
    icon: (
      <svg
        className="w-6"
        viewBox="3.7 3.7 43.6 43.6"
        width="2500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m47.3 3.7v21.8l-10.9 10.9-10.9 10.9-10.9-10.9 10.9-10.9v.1-.1z"
          fill="#59529d"
        />
        <path d="m47.3 25.5v21.8l-10.9-10.9z" fill="#5271b4" />
        <path
          d="m25.5 25.5-10.9 10.9-10.9 10.9v-43.6l10.9 10.9z"
          fill="#bb4b96"
        />
      </svg>
    ),
    name: "Framer Motion",
  },
  {
    icon: (
      <svg
        className="w-6"
        viewBox="0 -58 256 256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            d="M78.0659341,92.5875806 C90.8837956,92.5875806 101.274726,82.1966508 101.274726,69.3787894 C101.274726,56.5609279 90.8837956,46.1699982 78.0659341,46.1699982 C65.2480726,46.1699982 54.8571429,56.5609279 54.8571429,69.3787894 C54.8571429,82.1966508 65.2480726,92.5875806 78.0659341,92.5875806 Z M23.2087913,139.005163 C36.0266526,139.005163 46.4175825,128.614233 46.4175825,115.796372 C46.4175825,102.97851 36.0266526,92.5875806 23.2087913,92.5875806 C10.3909298,92.5875806 0,102.97851 0,115.796372 C0,128.614233 10.3909298,139.005163 23.2087913,139.005163 Z M232.791209,139.005163 C245.60907,139.005163 256,128.614233 256,115.796372 C256,102.97851 245.60907,92.5875806 232.791209,92.5875806 C219.973347,92.5875806 209.582418,102.97851 209.582418,115.796372 C209.582418,128.614233 219.973347,139.005163 232.791209,139.005163 Z"
            fill="#000000"
          ></path>
          <path
            d="M156.565464,70.3568084 C155.823426,62.6028163 155.445577,56.1490255 149.505494,51.6131676 C141.982638,45.8687002 133.461166,49.5960243 122.964463,45.8072968 C112.650326,43.3121427 105,34.1545727 105,23.2394367 C105,10.4046502 115.577888,0 128.626373,0 C138.29063,0 146.599638,5.70747659 150.259573,13.8825477 C155.861013,24.5221258 152.220489,35.3500418 159.258242,40.8041273 C167.591489,47.2621895 178.826167,42.5329154 191.362109,48.6517412 C195.390112,50.5026944 198.799584,53.4384578 201.202056,57.0769224 C203.604528,60.7153869 205,65.0565524 205,69.7183101 C205,80.633446 197.349674,89.7910161 187.035538,92.2861702 C176.538834,96.0748977 168.017363,92.3475736 160.494506,98.092041 C152.03503,104.551712 156.563892,115.358642 149.669352,126.774447 C145.756163,134.291567 137.802119,139.43662 128.626373,139.43662 C115.577888,139.43662 105,129.03197 105,116.197184 C105,106.873668 110.581887,98.832521 118.637891,95.1306146 C131.173833,89.0117889 142.408511,93.7410629 150.741758,87.2830007 C155.549106,83.5574243 156.565464,77.8102648 156.565464,70.3568084 Z"
            fill="#D0021B"
          ></path>
        </g>
      </svg>
    ),
    name: "React Router",
  },
  {
    icon: <SiReact />,
    name: "React Hooks",
  },
  {
    icon: (
      <svg
        className="w-6"
        fill="#26A69A"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>i18next</title>
        <path d="M14.93646 2.48699v4.51684l5.0758 13.03647s1.5495 3.1839-2.8824 3.9597H7.01922s-4.13084-.4311-3.14053-3.7019L9.21276 7.00401V2.48699h5.7237Zm2.0894 13.10781c-4.4301-1.3742-8.15457-.6365-9.97498-.0788l-1.83572 4.4186c-.78296 2.499 2.27302 2.9417 2.59687 2.9813l.02755.0032h8.44448c3.5407-.5982 2.511-2.972 2.4147-3.1773l-.0068-.0142-1.6661-4.1328Zm-7.81345.7772c.78905.0004 1.42905.3862 1.42905.8646 0 .4764-.6404.864-1.42905.864-.7887 0-1.42711-.3878-1.42711-.864 0-.4784.6384-.8646 1.4271-.8646Zm5.08375 0c.7871.0004 1.4271.3862 1.4271.8646 0 .4764-.6403.864-1.4271.864-.791 0-1.429-.3878-1.429-.864 0-.4784.638-.8646 1.429-.8646Zm-4.5001-5.2131c-.55227 0-.99993.5395-.99993 1.2051 0 .6656.44766 1.2051.99993 1.2051.5522 0 .9998-.5395.9998-1.2051 0-.6656-.4476-1.2051-.9998-1.2051Zm3.6413-1.29686c-.6549 0-1.1862.63806-1.1862 1.42906 0 .7871.5313 1.4271 1.1862 1.4271.653 0 1.1862-.64 1.1862-1.4271 0-.7907-.5328-1.42906-1.1862-1.42906Zm6.0363-2.73783s-2.1219 1.54591-4.0858-.41975V4.55615s2.7243-.60065 4.0858 2.56806Zm-14.84367 0C5.9908 3.9555 8.71543 4.55615 8.71543 4.55615v2.14831c-1.96566 1.96566-4.08544.41975-4.08544.41975ZM15.04366 0c.4954 0 .8958.4387.8958.98109 0 .54203-.4006.98074-.8958.98074H8.95478c-.49315 0-.89428-.43871-.89428-.98074C8.0605.43871 8.46146 0 8.95478 0h6.08888Z" />
      </svg>
    ),
    name: "i18next",
  },
  {
    icon: (
      <svg
        className="w-6"
        enable-background="new 0 0 2500 1250"
        viewBox="0 0 2500 1250"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-rule="evenodd" fill-rule="evenodd">
          <path d="m0 0h2500v1250h-2500z" />
          <path
            d="m673.8 479.4-.6-168.1h-93.8l.6 168.1 46.9 64.4zm-93.8 288.1v168.7h93.8v-168.7l-46.9-64.4z"
            fill="#fff"
          />
          <path
            d="m673.8 767.5 98.8 136.3 75.6-55-98.8-136.3-75.6-24.4zm-93.8-288.1-99.4-136.3-75.6 55 98.8 136.2 76.2 24.4z"
            fill="#00f2e6"
          />
          <path
            d="m503.8 534.4-160-51.9-28.8 88.7 160 52.5 75.6-25zm198.7 113.7 46.9 64.4 160 51.9 28.8-88.7-160-51.9z"
            fill="#00b9f1"
          />
          <path
            d="m778.1 623.8 160-52.5-28.8-88.7-160 51.9-46.9 64.4zm-303.1 0-160 51.9 28.8 88.7 160-51.9 46.9-64.4z"
            fill="#d63aff"
          />
          <path
            d="m503.8 712.5-98.8 136.3 75.6 55 99.4-136.3v-79.4zm245.6-178.1 98.8-136.3-75.6-55-98.8 136.2v79.4z"
            fill="#fb015b"
          />
          <path
            d="m1288.1 470.6v218.7c0 48.1-39.4 87.5-87.5 87.5v-43.8c24.4 0 43.8-19.4 43.8-43.8v-218.6zm798.8 43.8h98.7v-43.7h-240.6v43.7h98.1v262.5h43.8zm-273.8-43.8v218.7c0 24.4-19.4 43.8-43.8 43.8s-43.8-19.4-43.8-43.8v-131.2c0-48.1-39.4-87.5-87.5-87.5s-87.5 39.4-87.5 87.5v131.3c0 24.4-19.4 43.8-43.8 43.8s-43.8-19.4-43.8-43.8v-218.8h-43.8v218.7c0 48.1 39.4 87.5 87.5 87.5s87.5-39.4 87.5-87.5v-131.2c0-24.4 19.4-43.8 43.8-43.8s43.8 19.4 43.8 43.8v131.3c0 48.1 39.4 87.5 87.5 87.5s87.5-39.4 87.5-87.5v-218.8z"
            fill="#fff"
          />
        </g>
      </svg>
    ),
    name: "JWT",
  },
];

export const backStack: TechType[] = [
  {
    icon: <SiNodedotjs className="text-[#8CC84B]" />,
    name: "Node.js",
  },
  {
    icon: <SiExpress className="text-base-text" />,
    name: "Express",
  },
  {
    icon: <SiMongodb className="text-[#47A248]" />,
    name: "MongoDB",
  },

  {
    icon: (
      <svg
        className="w-6"
        fill="#880000"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Mongoose</title>
        <path d="M14.014 7.37a9.162 9.162 0 0 0-.808.025c-.218.017-.434.072-.65.11.229.118.456.213.68.315.225.103.436.232.629.387-.253-.097-.499-.208-.752-.298a8.046 8.046 0 0 0-1.624-.421c-.273-.037-.546-.073-.819.005-.276.078-.354.18-.38.458-.04.46.098.887.281 1.298a4.432 4.432 0 0 0 1.185 1.573c.391.335.825.598 1.305.787.136.053.274.103.411.155l-.009.032c-.263-.072-.532-.126-.787-.22a4.14 4.14 0 0 1-1.222-.73 4.16 4.16 0 0 1-1.007-1.22 3.43 3.43 0 0 1-.43-1.609l-.012.005C4.891 7.488.402 11.595.035 11.94l-.034.014c-.002.005 0 .01.003.016L0 11.974l.005-.002c.004.008.01.016.013.024.087-.019.173-.042.26-.054l.069-.01c.324-.115.655-.205.997-.253.484-.069.985-.159 1.48-.156.468.002.943.074 1.402.153.129.022.255.052.38.087.335.075.65.21.933.391l.06.03c.403.19.758.47 1.038.811.052.057.141.116.187.178.096.114.142.236.303.363v-1.737h2.01l.939 1.733.942-1.733h2.07v3.357l.343-.226s.375-1 2.116-1.14l1.996-.064c-.308-.637-.307-.637-.159-.83.147-.19 1.28-.314 1.48-.433l2.912-.588c.007-.022.015.012.03.007.072-.022.147-.037.25-.061l.66-.16c.042-.025.093-.034.14-.05.308-.107.577-.245.726-.573.145-.319.339-.616.41-.967.022-.111.003-.208-.078-.288-.097-.096-.222-.138-.35-.171-.421-.173-.84-.35-1.264-.513-.261-.101-.529-.185-.795-.27a30.574 30.574 0 0 0-.794-.243c-.244-.072-.49-.138-.736-.205-.24-.066-.48-.133-.72-.192-.282-.07-.565-.13-.847-.195-.215-.05-.428-.102-.644-.146-.234-.047-.47-.089-.706-.13-.302-.053-.602-.112-.905-.153-.366-.05-.734-.082-1.101-.125-.345-.04-.691-.065-1.038-.07zm-3.303.767a.154.154 0 0 1 .056.007c.42.13.83.277 1.216.491.365.203.695.45.979.756.012.013.02.028.036.05l-.645-.293-.021.026.37.551-.022.022a1.986 1.986 0 0 0-.665-.322l-.02.02.633.74-.416-.136-.017.02c.163.27.376.505.58.775-.354-.2-.665-.42-.956-.669a4.488 4.488 0 0 1-1.01-1.185c-.107-.19-.201-.385-.222-.606a.468.468 0 0 1 .011-.15.123.123 0 0 1 .113-.097zm5.424.668c.154.002.311-.006.464.015.278.037.555.092.832.14.158.027.317.052.474.086.297.064.594.133.89.2.196.046.392.092.587.14l-.329.161c-.365.027-.731.055-1.097.057a3.268 3.268 0 0 1-.675-.074c-.28-.058-.514-.196-.652-.466-.02-.04-.09-.063-.14-.078-.18-.054-.362-.1-.544-.168.063-.005.126-.014.19-.013zm3.223 2.635.005.02c-.08.022-.16.042-.239.067-.455.14-.916.266-1.363.428-.28.101-.544.25-.81.388-.233.119-.315.322-.287.575.019.162.04.324.055.488a1.786 1.786 0 0 1-.288-.701c-.035-.169.058-.273.18-.365.238-.178.496-.318.777-.41.35-.117.702-.233 1.059-.325.251-.065.513-.09.77-.133.048-.008.094-.021.141-.032zM9.141 13.955v2.676h1.869l.064-.066v-2.61l-.97 1.495z" />
      </svg>
    ),
    name: "Mongoose",
  },
  {
    icon: (
      <svg
        className="w-6"
        enable-background="new 0 0 2500 1250"
        viewBox="0 0 2500 1250"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-rule="evenodd" fill-rule="evenodd">
          <path d="m0 0h2500v1250h-2500z" />
          <path
            d="m673.8 479.4-.6-168.1h-93.8l.6 168.1 46.9 64.4zm-93.8 288.1v168.7h93.8v-168.7l-46.9-64.4z"
            fill="#fff"
          />
          <path
            d="m673.8 767.5 98.8 136.3 75.6-55-98.8-136.3-75.6-24.4zm-93.8-288.1-99.4-136.3-75.6 55 98.8 136.2 76.2 24.4z"
            fill="#00f2e6"
          />
          <path
            d="m503.8 534.4-160-51.9-28.8 88.7 160 52.5 75.6-25zm198.7 113.7 46.9 64.4 160 51.9 28.8-88.7-160-51.9z"
            fill="#00b9f1"
          />
          <path
            d="m778.1 623.8 160-52.5-28.8-88.7-160 51.9-46.9 64.4zm-303.1 0-160 51.9 28.8 88.7 160-51.9 46.9-64.4z"
            fill="#d63aff"
          />
          <path
            d="m503.8 712.5-98.8 136.3 75.6 55 99.4-136.3v-79.4zm245.6-178.1 98.8-136.3-75.6-55-98.8 136.2v79.4z"
            fill="#fb015b"
          />
          <path
            d="m1288.1 470.6v218.7c0 48.1-39.4 87.5-87.5 87.5v-43.8c24.4 0 43.8-19.4 43.8-43.8v-218.6zm798.8 43.8h98.7v-43.7h-240.6v43.7h98.1v262.5h43.8zm-273.8-43.8v218.7c0 24.4-19.4 43.8-43.8 43.8s-43.8-19.4-43.8-43.8v-131.2c0-48.1-39.4-87.5-87.5-87.5s-87.5 39.4-87.5 87.5v131.3c0 24.4-19.4 43.8-43.8 43.8s-43.8-19.4-43.8-43.8v-218.8h-43.8v218.7c0 48.1 39.4 87.5 87.5 87.5s87.5-39.4 87.5-87.5v-131.2c0-24.4 19.4-43.8 43.8-43.8s43.8 19.4 43.8 43.8v131.3c0 48.1 39.4 87.5 87.5 87.5s87.5-39.4 87.5-87.5v-218.8z"
            fill="#fff"
          />
        </g>
      </svg>
    ),
    name: "JWT",
  },
];
