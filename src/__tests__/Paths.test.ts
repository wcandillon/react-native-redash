/* eslint-disable max-len */
import { serialize, parse, getYForX } from "../Paths";

const d =
  "M 0,173.25 C 0,173.25 0,173.25 0.38333333333333336,172.7471016280217 C 0.7666666666666667,172.24420325604342 1.5333333333333334,171.23840651208684 2.3000000000000003,170.2730300040364 C 3.066666666666667,169.307653495986 3.833333333333334,168.38269722384177 4.6000000000000005,167.96083553841325 C 5.366666666666667,167.5389738529847 6.133333333333333,167.6202067542719 6.8999999999999995,167.2148271067857 C 7.666666666666667,166.80944745929946 8.433333333333334,165.91745526303987 9.200000000000001,165.26680719379289 C 9.966666666666667,164.6161591245459 10.733333333333334,164.20685518231153 11.5,163.87564470556578 C 12.266666666666666,163.54443422882002 13.033333333333331,163.29131721756292 13.799999999999997,163.17594295196662 C 14.566666666666668,163.06056868637037 15.333333333333334,163.08293716643493 16.1,163.12806655603893 C 16.86666666666667,163.1731959456429 17.633333333333336,163.2410862447863 18.400000000000002,162.6956092747903 C 19.166666666666668,162.15013230479437 19.933333333333337,160.99128806565906 20.700000000000003,160.5392093106696 C 21.46666666666667,160.08713055568015 22.233333333333334,160.34181728483654 23,160.0957640041261 C 23.766666666666666,159.84971072341568 24.53333333333333,159.1029174328385 25.3,158.85450957527917 C 26.066666666666666,158.60610171771987 26.833333333333332,158.85607929317845 27.599999999999998,158.5248688164327 C 28.366666666666664,158.19365833968695 29.13333333333333,157.28125981073688 29.899999999999995,156.64748620890705 C 30.666666666666668,156.0137126070772 31.433333333333337,155.65856393236757 32.2,155.15586177512668 C 32.96666666666667,154.6531596178858 33.733333333333334,154.00290397811364 34.5,153.5830044400592 C 35.26666666666667,153.16310490200476 36.03333333333334,152.973561465668 36.800000000000004,152.88016325066152 C 37.56666666666667,152.786765035655 38.333333333333336,152.78951204197872 39.1,152.83267928420864 C 39.86666666666667,152.87584652643855 40.63333333333333,152.9594340045746 41.400000000000006,152.64195855944746 C 42.16666666666667,152.32448311432032 42.93333333333334,151.60594474592995 43.70000000000001,150.9395994976903 C 44.46666666666667,150.2732542494506 45.23333333333333,149.6591021213616 46,149.052798582769 C 46.76666666666667,148.44649504417634 47.53333333333334,147.84804009508005 48.300000000000004,147.57961833430508 C 49.06666666666667,147.31119657353005 49.833333333333336,147.37280800107638 50.6,146.95840247566935 C 51.36666666666667,146.54399695026237 52.13333333333333,145.65357447190203 52.9,145.73519980266403 C 53.666666666666664,145.81682513342602 54.43333333333333,146.8704982733103 55.199999999999996,146.8999304839216 C 55.96666666666666,146.9293626945329 56.73333333333333,145.93455397587118 57.5,145.6367000044849 C 58.26666666666667,145.33884603309863 59.03333333333333,145.73794680898774 59.79999999999999,145.8344844597928 C 60.56666666666666,145.93102211059784 61.333333333333336,145.7249966363188 62.1,145.43970040812667 C 62.86666666666667,145.15440417993452 63.63333333333333,144.7898371978293 64.4,144.7462775261246 C 65.16666666666667,144.7027178544199 65.93333333333334,144.98016549311566 66.7,145.20698972956004 C 67.46666666666667,145.4338139660044 68.23333333333333,145.61001480019735 69,145.68457640041262 C 69.76666666666667,145.7591380006279 70.53333333333333,145.7320603668655 71.3,146.1802148271068 C 72.06666666666666,146.62836928734808 72.83333333333333,147.55175584159306 73.60000000000001,147.6274947302328 C 74.36666666666667,147.7032336188725 75.13333333333333,146.93132484190699 75.89999999999999,146.4921962595865 C 76.66666666666667,146.053067677266 77.43333333333334,145.94671928959053 78.2,145.67868995829033 C 78.96666666666667,145.4106606269902 79.73333333333333,144.9809503520653 80.5,144.18510337713596 C 81.26666666666667,143.38925640220657 82.03333333333335,142.22727272727272 82.80000000000001,141.60056285598958 C 83.56666666666668,140.97385298470647 84.33333333333333,140.88241691707404 85.10000000000001,140.80471588106025 C 85.86666666666667,140.72701484504643 86.63333333333333,140.66304884065121 87.40000000000002,140.7509530430103 C 88.16666666666667,140.83885724536933 88.93333333333334,141.07863165448268 89.7,141.11434273669104 C 90.46666666666665,141.1500538188994 91.23333333333333,140.9817015742028 92,140.3216351975602 C 92.76666666666667,139.6615688209176 93.53333333333335,138.509788312329 94.3,138.01846660985782 C 95.06666666666666,137.52714490738663 95.83333333333333,137.69628201103288 96.60000000000001,137.794781809212 C 97.36666666666667,137.89328160739112 98.13333333333334,137.92114410010313 98.90000000000002,137.71708077319818 C 99.66666666666667,137.51301744629322 100.43333333333334,137.07702829977129 101.2,136.8227340000897 C 101.96666666666665,136.56843970040813 102.73333333333333,136.49584024756695 103.5,135.90719603534106 C 104.26666666666667,135.3185518231152 105.03333333333335,134.21386285150467 105.80000000000001,133.51965511055297 C 106.56666666666666,132.82544736960128 107.33333333333333,132.5417208593084 108.10000000000001,132.72851728932145 C 108.86666666666667,132.91531371933445 109.63333333333333,133.57263308965332 110.39999999999998,134.0588532089519 C 111.16666666666667,134.54507332825042 111.93333333333332,134.86019419652868 112.69999999999999,134.72559088666637 C 113.46666666666665,134.59098757680405 114.23333333333333,134.00666008880117 115,133.29793245728123 C 115.76666666666667,132.5892048257613 116.53333333333335,131.75607705072431 117.30000000000001,131.1666479795488 C 118.06666666666666,130.5772189083733 118.83333333333333,130.23148854105935 119.59999999999998,130.48185854599274 C 120.36666666666667,130.73222855092615 121.13333333333333,131.57869892810695 121.90000000000002,131.94562048706103 C 122.66666666666667,132.31254204601518 123.43333333333332,132.19991478674262 124.19999999999999,132.10769386016057 C 124.96666666666665,132.0154729335785 125.73333333333335,131.94365833968695 126.5,132.09631340539084 C 127.2666666666667,132.24896847109474 128.03333333333333,132.62609319639412 128.8,132.49698389917927 C 129.5666666666667,132.3678746019644 130.33333333333334,131.73253128223527 131.1,130.9908395748307 C 131.86666666666667,130.2491478674261 132.63333333333333,129.40110777234605 133.4,128.52952190877696 C 134.16666666666666,127.65793604520788 134.9333333333333,126.76280441314975 135.7,125.84216486522853 C 136.46666666666667,124.92152531730727 137.23333333333332,123.9753778535229 138,123.40360810871418 C 138.76666666666668,122.83183836390545 139.53333333333333,122.6344463380724 140.3,122.62031887697896 C 141.0666666666667,122.60619141588553 141.83333333333334,122.77532851953178 142.6,122.71136251513657 C 143.36666666666665,122.64739651074136 144.13333333333333,122.35032739830471 144.9,121.83624478629412 C 145.66666666666666,121.32216217428352 146.43333333333334,120.591066062699 147.20000000000002,120.2924272323631 C 147.96666666666667,119.99378840202718 148.73333333333335,120.12760685293985 149.5,120.29870610396017 C 150.26666666666665,120.4698053549805 151.03333333333333,120.67818540610845 151.79999999999998,120.39995290846302 C 152.56666666666663,120.1217204108176 153.33333333333334,119.35687536439882 154.1,118.62538682333947 C 154.86666666666667,117.89389828228013 155.63333333333333,117.19576624658026 156.4,116.50312822352784 C 157.16666666666666,115.8104902004754 157.93333333333337,115.12334619007042 158.70000000000002,114.2191886800915 C 159.46666666666667,113.31503117011256 160.23333333333335,112.19386016055971 161,111.64367403686595 C 161.76666666666665,111.09348791317217 162.53333333333333,111.1142866753375 163.29999999999998,110.73951652688703 C 164.06666666666666,110.36474637843656 164.83333333333334,109.59440731937032 165.6,109.09445216845315 C 166.36666666666667,108.594497017536 167.13333333333335,108.36492577476791 167.9,108.38690182535767 C 168.66666666666666,108.40887787594744 169.4333333333333,108.68240121989506 170.2,109.29380634166033 C 170.96666666666667,109.90521146342557 171.73333333333335,110.85449836300847 172.5,111.50318428488139 C 173.26666666666665,112.15187020675428 174.03333333333333,112.49995515091717 174.79999999999998,112.67419383773603 C 175.5666666666667,112.84843252455488 176.33333333333334,112.8488249540297 177.10000000000002,112.6353433197291 C 177.86666666666667,112.42186168542854 178.63333333333333,111.99450598735257 179.4,112.01844418531641 C 180.16666666666666,112.04238238328026 180.9333333333333,112.51761447728393 181.69999999999996,112.56627573216129 C 182.46666666666667,112.61493698703862 183.23333333333335,112.23702740278962 184,111.48591738798943 C 184.76666666666665,110.73480737318921 185.53333333333333,109.61049692783781 186.29999999999998,109.20276270350273 C 187.0666666666667,108.79502847916758 187.83333333333334,109.10387047584875 188.60000000000002,109.15881060232319 C 189.36666666666667,109.21375072879759 190.13333333333333,109.01478898506525 190.9,108.75774767905996 C 191.66666666666666,108.50070637305468 192.43333333333337,108.18558550477644 193.20000000000002,107.57614253038525 C 193.9666666666667,106.96669955599407 194.73333333333335,106.06293447548997 195.5,105.70660851235591 C 196.26666666666665,105.35028254922186 197.03333333333333,105.54139570345785 197.79999999999998,105.48802529488272 C 198.5666666666667,105.43465488630757 199.33333333333334,105.1368009149213 200.10000000000002,104.93587702381485 C 200.86666666666667,104.73495313270844 201.63333333333333,104.63095932188186 202.4,104.47948154460242 C 203.16666666666666,104.32800376732295 203.93333333333337,104.12904202359061 204.70000000000002,103.50076243440822 C 205.4666666666667,102.87248284522582 206.23333333333335,101.81488541059336 207,101.50290397811364 C 207.76666666666665,101.19092254563395 208.5333333333333,101.62455711530698 209.29999999999995,101.54921065614208 C 210.06666666666663,101.47386419697717 210.83333333333334,100.88953670897429 211.60000000000002,100.31384266941741 C 212.36666666666667,99.73814862986052 213.13333333333335,99.1710880387496 213.9,98.71979414270977 C 214.6666666666667,98.26850024666994 215.43333333333337,97.93297304570122 216.20000000000002,97.67593173969594 C 216.9666666666667,97.41889043369063 217.73333333333335,97.24033502264878 218.5,97.45303179799971 C 219.26666666666665,97.66572857335068 220.0333333333333,98.2696775350944 220.79999999999995,98.79906489662285 C 221.56666666666663,99.32845225815133 222.33333333333334,99.7832780194645 223.1,99.42538233843118 C 223.86666666666665,99.06748665739785 224.63333333333333,97.89686953401802 225.39999999999998,96.98447100506793 C 226.16666666666666,96.07207247611785 226.9333333333333,95.41789254159751 227.70000000000002,94.59693008027985 C 228.4666666666667,93.77596761896218 229.23333333333335,92.7882226308472 230,92.12894111315426 C 230.76666666666665,91.46965959546128 231.53333333333333,91.13884154819034 232.29999999999998,90.71070099116474 C 233.0666666666667,90.28256043413914 233.83333333333334,89.75709736735884 234.6,89.33876754720366 C 235.36666666666665,88.92043772704847 236.13333333333333,88.6092411535184 236.89999999999998,88.45030721621742 C 237.66666666666666,88.29137327891642 238.4333333333333,88.28470197784456 239.19999999999996,87.94093375790465 C 239.96666666666667,87.59716553796476 240.73333333333335,86.91630039915684 241.5,86.59215365295779 C 242.26666666666668,86.26800690675877 243.03333333333333,86.30057855316859 243.79999999999998,86.59960981297934 C 244.5666666666667,86.89864107279006 245.33333333333334,87.4641319460017 246.1,87.40605238372875 C 246.86666666666665,87.3479728214558 247.63333333333333,86.66632282369825 248.39999999999998,86.29076781629816 C 249.16666666666666,85.91521280889805 249.9333333333333,85.84575279185539 250.69999999999996,85.29792124501053 C 251.46666666666667,84.75008969816567 252.23333333333335,83.72388662151859 253,83.78863748486343 C 253.76666666666668,83.85338834820828 254.53333333333333,85.00909315154506 255.30000000000004,85.63972731757634 C 256.06666666666666,86.27036148360764 256.8333333333333,86.37592501233348 257.59999999999997,86.12633986634972 C 258.3666666666667,85.87675472036597 259.1333333333333,85.2720208996726 259.9,84.96906534511369 C 260.6666666666667,84.66610979055478 261.43333333333334,84.66493250213033 262.2,84.67238866215185 C 262.96666666666664,84.67984482217338 263.73333333333335,84.69593443064089 264.5,84.53307619859174 C 265.26666666666665,84.37021796654258 266.03333333333336,84.02841189397677 266.8,83.91029062205678 C 267.56666666666666,83.79216935013679 268.3333333333333,83.89773287886263 269.09999999999997,83.94168498004215 C 269.8666666666667,83.9856370812217 270.6333333333333,83.96797775485491 271.4,84.18224424810512 C 272.1666666666667,84.39651074135534 272.93333333333334,84.84270305422254 273.7,85.15664663407632 C 274.46666666666664,85.47059021393012 275.23333333333335,85.65228506077051 276,85.27359061757188 C 276.76666666666665,84.89489617437323 277.53333333333336,83.95581244113556 278.3,83.55200251154864 C 279.06666666666666,83.1481925819617 279.8333333333333,83.27965645602548 280.6,83.26003498228461 C 281.36666666666673,83.24041350854375 282.1333333333334,83.06970668699825 282.90000000000003,82.5748531192537 C 283.6666666666667,82.07999955150916 284.43333333333334,81.26099923756558 285.2,80.82108579629546 C 285.96666666666664,80.38117235502534 286.73333333333335,80.32034578642866 287.5,80.49929362694533 C 288.26666666666665,80.67824146746199 289.0333333333333,81.09696371709198 289.79999999999995,81.44583352020452 C 290.56666666666666,81.79470332331705 291.3333333333333,82.07372067991211 292.1,81.74721935686416 C 292.86666666666673,81.42071803381621 293.6333333333334,80.48869803112527 294.40000000000003,79.59003453379378 C 295.1666666666667,78.6913710364623 295.93333333333334,77.82606404449028 296.7,77.32846347042202 C 297.46666666666664,76.83086289635376 298.23333333333335,76.70096874018925 299,76.66486522850607 C 299.76666666666665,76.6287617168229 300.53333333333336,76.68644884962102 301.3,76.72098264340494 C 302.06666666666666,76.75551643718886 302.8333333333333,76.76689689195857 303.59999999999997,76.92543839978474 C 304.3666666666666,77.0839799076109 305.1333333333334,77.38968246849352 305.90000000000003,77.08005561286272 C 306.6666666666667,76.77042875723191 307.43333333333334,75.84547248508768 308.2,75.32000941830741 C 308.96666666666664,74.79454635152712 309.73333333333335,74.66857649011078 310.5,74.69133739965018 C 311.26666666666665,74.71409830918958 312.03333333333336,74.8855899896847 312.8,74.53789747499663 C 313.56666666666666,74.19020496030856 314.3333333333333,73.32332825043727 315.09999999999997,72.69622594967933 C 315.8666666666666,72.06912364892138 316.6333333333334,71.68179575727676 317.40000000000003,71.10060770507242 C 318.1666666666667,70.51941965286811 318.93333333333334,69.74437144010405 319.7,68.97560209893709 C 320.46666666666664,68.2068327577701 321.23333333333335,67.44434228820022 322,66.6065053594654 C 322.76666666666665,65.76866843073059 323.53333333333336,64.85548504283088 324.3,63.91522402116877 C 325.06666666666666,62.97496299950666 325.8333333333333,62.00762434408216 326.59999999999997,61.35972328115889 C 327.3666666666666,60.71182221823563 328.13333333333327,60.38335874781361 328.9,59.906164506435836 C 329.6666666666667,59.42897026505808 330.43333333333334,58.80304525272458 331.20000000000005,58.33762389559132 C 331.9666666666667,57.87220253845808 332.73333333333335,57.56728483652509 333.5,57.68422882002064 C 334.26666666666665,57.801172803516174 335.03333333333336,58.339978472440244 335.8,58.67982239763197 C 336.56666666666666,59.0196663228237 337.3333333333333,59.16054850428309 338.09999999999997,58.87996142978877 C 338.8666666666666,58.59937435529444 339.63333333333327,57.897318024846406 340.4,57.01552899493206 C 341.1666666666667,56.133739965017725 341.93333333333334,55.07221823563708 342.7,54.3670224693905 C 343.4666666666667,53.66182670314391 344.23333333333335,53.31295690003139 345,52.91542584204152 C 345.76666666666665,52.51789478405166 346.5333333333333,52.071702471184466 347.3,51.75030273130915 C 348.06666666666666,51.42890299143383 348.8333333333333,51.23229582455039 349.59999999999997,50.771976050589764 C 350.3666666666666,50.311656276629144 351.1333333333334,49.58762389559133 351.8999999999999,49.00211911916401 C 352.6666666666667,48.416614342736686 353.43333333333334,47.969637170919846 354.2,47.19380409920617 C 354.9666666666667,46.417971027492484 355.73333333333335,45.313282055881956 356.5,44.47112840292416 C 357.26666666666665,43.62897474996637 358.0333333333333,43.0493564156613 358.8,42.90651208682783 C 359.56666666666666,42.76366775799435 360.3333333333333,43.05759743463246 361.09999999999997,43.650165941606495 C 361.8666666666666,44.24273444858053 362.6333333333334,45.13394178589048 363.3999999999999,45.495369332197164 C 364.1666666666667,45.85679687850384 364.93333333333334,45.68844463380725 365.7,45.12413104902006 C 366.4666666666667,44.55981746423286 367.23333333333335,43.59954253935506 368,42.5556801363412 C 368.76666666666665,41.51181773332734 369.5333333333333,40.38436785217741 370.3,39.7215544692111 C 371.06666666666666,39.05874108624479 371.8333333333333,38.860564201462076 372.59999999999997,38.59175001121227 C 373.3666666666666,38.32293582096246 374.1333333333334,37.98348432524555 374.8999999999999,37.45370453424228 C 375.6666666666667,36.923924743239006 376.43333333333334,36.203816656949364 377.2,35.352637126070775 C 377.9666666666667,34.501457595192186 378.73333333333335,33.519206619724635 379.5,32.973729649728675 C 380.26666666666665,32.428252679732715 381.0333333333333,32.319549715208346 381.8,31.726588778759496 C 382.56666666666666,31.13362784231065 383.3333333333333,30.05640893393733 384.09999999999997,29.596089159976703 C 384.86666666666673,29.13576938601608 385.6333333333334,29.29234874646815 386.40000000000003,29.545858187200082 C 387.1666666666667,29.799367627932014 387.93333333333334,30.149807148943808 388.7,30.476308471991754 C 389.4666666666667,30.802809795039696 390.23333333333335,31.105372920123795 391,31.23095035206531 C 391.76666666666665,31.35652778400683 392.5333333333333,31.305119522805768 393.29999999999995,30.884827555276505 C 394.0666666666666,30.464535587747246 394.8333333333333,29.675359913889782 395.59999999999997,28.83870027357943 C 396.36666666666673,28.002040633269075 397.1333333333334,27.11789702650583 397.90000000000003,26.50570704579093 C 398.6666666666667,25.893517065076036 399.43333333333334,25.553280710409485 400.2,24.91832982015519 C 400.9666666666667,24.28337892990089 401.73333333333335,23.353713504058845 402.5,22.422870789792352 C 403.26666666666665,21.492028075525855 404.0333333333333,20.560008072834915 404.8,19.97214871955869 C 405.56666666666666,19.384289366282463 406.3333333333333,19.14059066242096 407.09999999999997,18.55704803336772 C 407.8666666666666,17.973505404314484 408.6333333333334,17.05011885006952 409.40000000000003,16.616091850921652 C 410.1666666666667,16.182064851773788 410.93333333333334,16.237397407723023 411.7,16.174608691752265 C414,15.75 414,15.75 414,15.75";

test("parse()", () => {
  const path =
    "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150 ";
  expect(serialize(parse(path))).toBe(path);
});

test("getYForX()", () => {
  const p1 = parse(
    "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150"
  );
  expect(getYForX(p1, 200)).toBe(75);
  expect(getYForX(p1, 50)).toBe(151.1683950839424);
});

test("getYForX2()", () => {
  const p1 = parse(d);
  expect(getYForX(p1, 358.7)).toBe(42.927607556166095);
  expect(getYForX(p1, 358.8)).toBe(42.90651208682783);
  expect(getYForX(p1, 359)).toBe(42.87906543969966);
});
