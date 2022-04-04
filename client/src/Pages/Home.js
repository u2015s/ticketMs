
import * as React from 'react';
import TrainSearchCard from '../components/TrainSearchCard';
import TrainCard from '../components/TrainCard';
import Navbar from '../components/Navbar';

export default function Home() {
    const [trainData, setTrainData] = React.useState([]);

    return (
        <>
            <div>
                <Navbar />
                <TrainSearchCard
                    setTrainData={setTrainData}
                />
                {
                    trainData.length !== 0 ?
                        trainData.map((item,index) => (
                            <TrainCard 
                            item = {item}
                            key = {index}
                            />
                        ))

                        :
                        <>
                            {/* <div>
                    No Trains Selected
                </div> */}
                        </>
                }
            </div>

        </>
    )
}