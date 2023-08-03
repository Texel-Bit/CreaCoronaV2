export const MosaicHexagon = () => {

    const hexagonUrl = "https://corona.texelbit.com:9445/uploads/Design/c200a7c5-fe53-4b8b-b034-775211e55f8e.svg";

    return(
        <div className='mosaic-hexagon'>

            <style>
                {`
                    .mosaic-hexagon {
                        width: 100%;
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        height: 100%;
                    }

                    .hexagon-column {
                        width: 100%;
                    }

                    .hexagon-column-1 .hexagon img {
                        position: relative;
                        left: -100%;
                    }

                    .hexagon-column-2 {
                        position: relative;
                        left: -50%;
                        margin-left: .12rem;
                        margin-top: -.12rem;
                        height: 83.33%;
                    }

                    .hexagon-column-2-wrapper {
                        position: absolute;
                        top: -29.5%;
                    }

                    .hexagon {
                        padding: 2px;
                        width: 100%;
                    }

                    .hexagon img {
                        width: 200%;
                    }
                `}
            </style>

            <div className="hexagon-column hexagon-column-1">
                <div className="hexagon">
                    <img src={hexagonUrl}/>
                </div>
                <div className="hexagon">
                    <img src={hexagonUrl}/>
                </div>
            </div>

            <div className="hexagon-column hexagon-column-2">
                <div className="hexagon-column-2-wrapper">
                    <div className="hexagon">
                        <img src={hexagonUrl}/>
                    </div>
                    <div className="hexagon">
                        <img src={hexagonUrl}/>
                    </div>
                    <div className="hexagon">
                        <img src={hexagonUrl}/>
                    </div>
                </div>
            </div>

            <div className="hexagon-column hexagon-column-3">
                <div className="hexagon">
                    <img src={hexagonUrl}/>
                </div>
                <div className="hexagon">
                    <img src={hexagonUrl}/>
                </div>
            </div>

        </div>
    );
}