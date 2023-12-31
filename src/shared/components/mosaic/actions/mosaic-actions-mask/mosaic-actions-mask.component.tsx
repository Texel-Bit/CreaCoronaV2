import SwapVertIcon from '@material-ui/icons/SwapVert';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useEffect, useState } from 'react';
import "./mosaic-actions-mask.component.css";
import Singleton from '../../../../../core/patterns/singleton';


interface MosaicActionMaskItemConfig {
    index: number,
    selected: boolean
}


export const MosaicActionsMask = () => {

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [itemsCongig, setItemsConfig] = useState<MosaicActionMaskItemConfig[]>([
        { index: 0, selected: false },
        { index: 1, selected: false },
        { index: 2, selected: false },
        { index: 3, selected: false }
    ]);


    useEffect(() => {

        const updatedItemsConfig = itemsCongig.map((itemConf) => ({
            ...itemConf,
            selected: false,
        }));

        if (selectedIndex > -1)
            updatedItemsConfig[selectedIndex].selected = true;

        setItemsConfig(updatedItemsConfig);

    }, [selectedIndex]);


    const onActionItemClick = (index: number) => {

        let currentIndex=index;
       
        if (index == selectedIndex)
        {
            currentIndex=-1;
        }
        Singleton.getInstance().ChangeMosaicIndex(currentIndex);
        setSelectedIndex(currentIndex);
            
    }


    function SwapVertical(index:number)
    {
       let currentIndex=0;

       if(index==0)
       {
        currentIndex=2;
       }
       else if(index==1)
       {
        currentIndex=3;
       }
       else  if(index==2)
       {
        currentIndex=0;
       }
       else if(index==3)
       {
        currentIndex=1;
       }

       Singleton.getInstance().SwapMosaicItems(index,currentIndex);
    }


    function SwapHorizontal(index:number)
    {
        let currentIndex=0;

       if(index==0)
       {
        currentIndex=1;
       }
       else if(index==1)
       {
        currentIndex=0;
       }
       else  if(index==2)
       {
        currentIndex=3;
       }
       else if(index==3)
       {
        currentIndex=2;
       }

       Singleton.getInstance().SwapMosaicItems(index,currentIndex);
    }

    function RotateObject()
    {
        
       Singleton.getInstance().RotateCurrentMosaicObject();
    }

    return (
        <div className="position-absolute w-100 h-100 mosaic-actions-mask gap-1 p-1">

            {Singleton.getInstance().GetCurrenColorTypeID()==2&&
                itemsCongig.map((itemConf, index) => 
                    <>
                        <div className={`mosaic-actions-mask-item cursor-pointer cursor-pointer-hover ${itemConf.selected ? 'selected' : ''}`}
                             onClick={() => onActionItemClick(itemConf.index)}>

                            <button onClick={()=>SwapVertical(itemConf.index)}><SwapVertIcon /></button>
                            <button onClick={RotateObject}><RefreshIcon  /></button>
                            <button onClick={()=>SwapHorizontal(itemConf.index)}><SwapHorizIcon /></button>

                        </div>
                    </>
                )
            }

        </div>
    );
}