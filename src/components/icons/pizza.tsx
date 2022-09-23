import { Icon } from '@pankod/refine-antd';

const PizzaIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.41768 14.7571V14.7572L7.39822 14.7571L7.37876 14.7572L7.36795 14.757C5.2808 14.7479 3.21795 14.3068 1.30936 13.4612C1.02205 13.3413 0.764049 13.1607 0.553039 12.9318C0.342029 12.7029 0.182993 12.4311 0.0868334 12.135C-0.00423916 11.8157 -0.0239659 11.4804 0.0290384 11.1526C0.0820426 10.8249 0.206484 10.5128 0.393548 10.2386L6.0094 1.01129C6.48543 0.227726 6.99433 0.0275262 7.35181 0.00204931C7.36646 0.000617841 7.38123 -6.97581e-05 7.39606 5.58219e-06C7.40338 -3.16111e-05 7.41068 0.000117162 7.41797 0.000449518C7.772 0.00226055 8.2795 0.211301 8.78272 1.01129L14.3986 10.2386C14.5861 10.5126 14.7111 10.8245 14.7649 11.1522C14.8186 11.4799 14.7998 11.8154 14.7096 12.135C14.6119 12.4303 14.4523 12.7014 14.2415 12.9301C14.0307 13.1588 13.7735 13.3398 13.4871 13.4612C11.5752 14.3082 9.50851 14.7494 7.41768 14.7571ZM6.74377 1.46056C6.97532 1.10497 7.19499 0.883937 7.39143 0.865646C7.58708 0.88541 7.82575 1.09957 8.04402 1.46056L13.4497 10.3425C11.6051 11.3832 9.52118 11.9318 7.39904 11.932C5.27506 11.932 3.18933 11.3828 1.34345 10.3405L6.74377 1.46056ZM7.3987 12.796L7.4178 12.7959L7.42222 12.7959C9.68239 12.7911 11.9012 12.2059 13.8671 11.0995C13.8841 11.1537 13.8979 11.209 13.9084 11.2651C13.9472 11.4736 13.9391 11.6881 13.8845 11.8931C13.8229 12.0707 13.7245 12.2334 13.5957 12.3703C13.467 12.5073 13.3107 12.6155 13.1372 12.6879C11.3709 13.4656 9.46539 13.8752 7.53674 13.8926C7.49836 13.8816 7.45831 13.8759 7.41768 13.8759C5.43568 13.8794 3.47466 13.4704 1.65928 12.675C1.4858 12.6006 1.32952 12.4912 1.2002 12.3537C1.07087 12.2162 0.971274 12.0535 0.907615 11.8758C0.858048 11.6732 0.852448 11.4624 0.891196 11.2575C0.901281 11.2041 0.914309 11.1515 0.930183 11.0999C2.89593 12.2061 5.11457 12.7911 7.37453 12.7959L7.37876 12.7959L7.3987 12.796ZM7.41206 3.77604L7.41326 3.77605H7.40894L7.41206 3.77604ZM8.01987 3.52299C7.85857 3.68428 7.64007 3.77522 7.41206 3.77604C7.19004 3.77485 6.97699 3.68823 6.81711 3.53413C6.73548 3.45411 6.67053 3.35869 6.62604 3.2534C6.58155 3.1481 6.5584 3.03502 6.55792 2.92071C6.55769 2.69677 6.64442 2.48148 6.79984 2.32024C6.96153 2.16064 7.17958 2.07115 7.40678 2.07115C7.63398 2.07115 7.85203 2.16064 8.01372 2.32024C8.16948 2.47925 8.26168 2.68976 8.27292 2.91207C8.27292 3.14121 8.18189 3.36096 8.01987 3.52299ZM9.61233 10.4459C9.77357 10.6014 9.98885 10.6881 10.2128 10.6879C10.4444 10.6823 10.6647 10.5861 10.8262 10.42C10.9806 10.2599 11.0672 10.0463 11.0681 9.82388C11.0589 9.6011 10.9664 9.38989 10.8089 9.23205C10.6472 9.07245 10.4292 8.98296 10.202 8.98296C9.9748 8.98296 9.75675 9.07245 9.59505 9.23205C9.43964 9.39329 9.35291 9.60858 9.35314 9.83252C9.35778 10.0626 9.45055 10.2822 9.61233 10.4459ZM4.86913 10.8088C4.54513 10.8088 4.22842 10.7126 3.95909 10.5325C3.68975 10.3524 3.4799 10.0965 3.35611 9.79706C3.23232 9.49764 3.20015 9.16823 3.26368 8.85052C3.3272 8.53281 3.48356 8.24109 3.71297 8.01229C3.94237 7.78349 4.2345 7.6279 4.55238 7.56522C4.87025 7.50253 5.19958 7.53557 5.49867 7.66015C5.79776 7.78473 6.05317 7.99525 6.23255 8.26506C6.41193 8.53487 6.50722 8.85184 6.50636 9.17584C6.50636 9.39064 6.46399 9.60333 6.38166 9.80173C6.29932 10.0001 6.17866 10.1803 6.02657 10.332C5.87448 10.4837 5.69396 10.6039 5.49535 10.6857C5.29673 10.7675 5.08393 10.8093 4.86913 10.8088ZM4.86913 8.40258C4.71619 8.40258 4.56669 8.44793 4.43953 8.5329C4.31237 8.61786 4.21326 8.73863 4.15473 8.87992C4.0962 9.02122 4.0809 9.17669 4.11073 9.32669C4.14057 9.47669 4.21421 9.61447 4.32236 9.72261C4.4305 9.83076 4.56828 9.9044 4.71827 9.93424C4.86827 9.96408 5.02375 9.94876 5.16504 9.89024C5.30634 9.83171 5.4271 9.7326 5.51207 9.60544C5.59704 9.47828 5.64239 9.32877 5.64239 9.17584C5.64239 8.97076 5.56092 8.77408 5.41591 8.62906C5.27089 8.48405 5.07421 8.40258 4.86913 8.40258ZM7.0767 8.14633C7.38998 8.35567 7.75831 8.4674 8.13509 8.4674C8.64 8.46626 9.1239 8.26518 9.48092 7.90815C9.83795 7.55113 10.039 7.06723 10.0402 6.56233C10.0402 6.18554 9.92843 5.81721 9.7191 5.50393C9.50977 5.19064 9.21224 4.94646 8.86413 4.80227C8.51603 4.65808 8.13298 4.62036 7.76343 4.69386C7.39388 4.76737 7.05444 4.94881 6.78801 5.21524C6.52158 5.48167 6.34014 5.82112 6.26663 6.19067C6.19313 6.56021 6.23085 6.94326 6.37504 7.29137C6.51923 7.63947 6.76341 7.937 7.0767 8.14633ZM7.55669 5.69669C7.7279 5.58229 7.92919 5.52124 8.13509 5.52124V5.50396C8.27328 5.50394 8.41009 5.53143 8.53754 5.58482C8.66499 5.63822 8.78053 5.71646 8.87744 5.81497C8.97434 5.91348 9.05066 6.0303 9.10195 6.15861C9.15324 6.28692 9.17848 6.42416 9.17619 6.56233C9.17619 6.76824 9.11513 6.96952 9.00073 7.14073C8.88634 7.31193 8.72374 7.44537 8.5335 7.52417C8.34327 7.60297 8.13394 7.62359 7.93199 7.58341C7.73003 7.54324 7.54453 7.44409 7.39893 7.29849C7.25333 7.15289 7.15418 6.96739 7.11401 6.76543C7.07383 6.56348 7.09445 6.35415 7.17325 6.16392C7.25205 5.97368 7.38549 5.81109 7.55669 5.69669Z"
      fill="white"
    />
  </svg>
);

export const PizzaIcon = (props: any) => (
  <Icon component={PizzaIconSVG} {...props} />
);
