// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <Box position={'relative'}>
            <Box overflow={'hidden'}>
                <Box
                    position={'absolute'}
                    zIndex={-1}
                    top={'calc( 50vh - 500px)'}
                    left={'calc( 50% - 500px);'}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width={'1000px'}
                        viewBox="50 65 400 400"
                        fill="none"
                        filter="blur(18px)"
                    >
                        <defs>
                            <linearGradient bx:pinned="true" id="a">
                                <stop
                                    offset={0}
                                    style={{
                                        stopColor: '#69b2ff',
                                    }}
                                />
                            </linearGradient>
                            <linearGradient bx:pinned="true" id="b">
                                <stop
                                    offset={0.989}
                                    style={{
                                        stopColor: '#4c0041',
                                    }}
                                />
                            </linearGradient>
                            <linearGradient
                                xlinkHref="#a"
                                id="e"
                                x1={289.151}
                                x2={289.151}
                                y1={269.801}
                                y2={383.755}
                                gradientTransform="matrix(-.78635 .61778 -.7753 -.98685 731.805 471.474)"
                                gradientUnits="userSpaceOnUse"
                            />
                            <linearGradient
                                xlinkHref="#a"
                                id="f"
                                x1={329.092}
                                x2={329.092}
                                y1={78.603}
                                y2={213.091}
                                gradientTransform="matrix(.82671 .56263 -.68561 1.00743 198.096 -184.719)"
                                gradientUnits="userSpaceOnUse"
                            />
                            <linearGradient
                                xlinkHref="#b"
                                id="d"
                                x1={196.858}
                                x2={196.858}
                                y1={151.213}
                                y2={265.583}
                                gradientTransform="matrix(.79387 -.60809 .7645 .99807 -79.977 119.998)"
                                gradientUnits="userSpaceOnUse"
                            />
                            <linearGradient
                                xlinkHref="#b"
                                id="c"
                                x1={158.613}
                                x2={158.613}
                                y1={318.869}
                                y2={432.105}
                                gradientTransform="matrix(-.75818 -.65204 .82783 -.96259 8.334 839.379)"
                                gradientUnits="userSpaceOnUse"
                            />
                        </defs>
                        <path
                            d="m70.725 432.105 94.291-113.011 81.523-.225s-94.573 112.833-94.573 112.801c0-.03-83.305.332-81.241.435Z"
                            style={{
                                strokeMiterlimit: 1,
                                paintOrder: 'fill',
                                stroke: '#000',
                                fill: 'url(#c)',
                            }}
                        />

                        <path
                            d="m114.857 151.213 87.974 114.143 76.063.227s-88.238-113.962-88.238-113.93c0 .03-77.726-.336-75.799-.44Z"
                            style={{
                                stroke: '#000',
                                fill: 'url(#d)',
                            }}
                        />
                        <path
                            d="m206.904 269.801 88.238 113.727 76.291.227s-88.502-113.548-88.502-113.516c0 .03-77.959-.334-76.027-.438Z"
                            style={{
                                stroke: '#000',
                                transformBox: 'fill-box',
                                transformOrigin: '50% 50%',
                                fill: 'url(#e)',
                                strokeOpacity: 0,
                            }}
                            transform="rotate(180 0 0)"
                        />
                        <path
                            d="m240.559 213.091 94.982-134.22 82.122-.268s-95.267 134.009-95.267 133.972c0-.036-83.917.394-81.837.516Z"
                            style={{
                                stroke: '#000',
                                transformBox: 'fill-box',
                                transformOrigin: '50% 50%',
                                fill: 'url(#f)',
                                strokeOpacity: 0,
                            }}
                            transform="rotate(180 0 0)"
                        />
                    </svg>
                </Box>
            </Box>
        </Box>
    );
};

export default AuthBackground;
