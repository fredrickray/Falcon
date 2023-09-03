import { LineWave } from 'react-loader-spinner'


const Loader = () => {
    <LineWave
        height="300"
        width="300"
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{ justifyContent: "center", position: "absolute", display: "flex", alignItems: "center", transform: "translate(-30%, -77%)", top: "50%", left: "50%", }}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
    />
}


export default Loader;