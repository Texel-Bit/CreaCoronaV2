import { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa'
import './experience-color-palette-selection.component.css';
import Singleton from '../../../core/patterns/singleton';
import { getAllDesignColorsBundle } from '../../../core/services/design.service';
import { IColorBundle } from '../../../core/models/color/color-bundle.model';
import { IColor } from '../../../core/models/color/color.model';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import Tooltip from '../Tooltip/Tooltip';
import TooltipMudi from '../TooltipMudi/TooltipMudi';

export const ExperienceColorPaletteSelection = () => {

    const [activeColorRow, setActiveColorRow] = useState<number | null>(null);
    const [colorsBundle, setColorBundles] = useState<IColorBundle[] | null >();

  
    useEffect(() => {

        console.log("Loading bundle list ");
        if (Singleton.getInstance().colorBundleList) {
            if(Singleton.getInstance().currentColorList?.length==0)
            {
                Singleton.getInstance().InitializeColors(Singleton.getInstance().colorBundleList![0].colorList || []);

            }
            else if(Singleton.getInstance().colorBundleList!?.length<4)
            {
                Singleton.getInstance().InitializeColors(Singleton.getInstance().colorBundleList![0].colorList || []);
            }
        }

        setTimeout(() => {
            if(Singleton.getInstance().currentPalletSelected && Singleton.getInstance().currentPalletSelected==-1)
            {
                setActiveColorRow(Singleton.getInstance().currentPalletSelected);
            }
            else
            {
                Singleton.getInstance().currentPalletSelected=0;
                setActiveColorRow(0);
            }  
        }, 1000);
      
        

    },[colorsBundle]);
    

    useEffect(() => {
       Singleton.getInstance().currentPalletSelected=activeColorRow;
       console.log(Singleton.getInstance().currentPalletSelected);
    },[activeColorRow]);
    

    useEffect(() => {
        const fetchColors = async () => {

            if(Singleton.getInstance().currentDesignList)
            {

                if (Singleton.getInstance().currentDesignList?.length??0 > 0) {
                    if (
                        Singleton.getInstance().selectedDesignType &&
                        Singleton.getInstance().currentEnvironmentType 
                    ) {
                        let colorTypeId = Singleton.getInstance().GetCurrenColorTypeID();

                        const CurrColorsSelected = await getAllDesignColorsBundle(
                            Singleton.getInstance().selectedDesignType?.id||1,
                            colorTypeId,
                            Singleton.getInstance().currentEnvironmentType?.id||1
                        );
                        


                        CurrColorsSelected.data.forEach((element: {idDesignColorBundle:any,DesignColorBundleName:any, DesignColorInBundle: any[]; }) => {

                            let colorArray:IColor[] = []; // initialize colorArray to an empty array
                        
                            element.DesignColorInBundle.forEach(color => {

                                let currentColor:IColor = {
                                    id:color.idDesignColors,
                                    source:color.DesignColorPath,
                                    name:color.DesignColorName,
                                    design: Singleton.getInstance().selectedDesignType ,
                                    isFullField: color.DesignColorType_idDesignColorType == 1 ? true : false,
                                };
                                
                                if(currentColor) colorArray.push(currentColor);
                            })
                                                    
                            let currBundle:IColorBundle = {  // use '=' instead of '{'
                                id: element.idDesignColorBundle,
                                bundleName: element.DesignColorBundleName,
                                colorList: colorArray
                            }

                            Singleton.getInstance().AddBundle(currBundle);
                                             
                        }); 
                        

                        setColorBundles(Singleton.getInstance().colorBundleList);


                    } else {
                    }
                } else {
                }
            }
            
            
        };
    
       
        fetchColors();
    }, []);  // <-- Don't forget the dependencies array. Update it as per your requirements.

    const showListColors = () => {
        console.log('showit')
        document.querySelector('.optionsColorsList')?.classList.remove('hiddenList')
    };

    const hiddenListColores = () =>{
        document.querySelector('.optionsColorsList')?.classList.add('hiddenList')
    }

    let entry = 0
    useEffect(()=>{
        
        if(entry==0){
            entry++
            document.querySelector('.select-color-palette-btn')?.addEventListener('click',()=>{
                if(document.querySelector('.hiddenList'))showListColors()
                else hiddenListColores();
            })
        };
       
    },[])
   
    let objetcSelected:string ;



    return(
        <>
           

           <TooltipMudi content='Corona te recomienda estas combinaciones.' visible={true} position='top'>
           <h3 className="color-middle fw-bold m-0 mb-3 subtitle" style={{zIndex: 20,top: "-10%"}}>Paleta sugerida</h3>
           </TooltipMudi>

            <div className='optionsColorsList'>
                
                <br></br>
                <>
                    {
                         colorsBundle?.map((element, index) => {
                            return (
                                <>
                                    <div
                                        className='color-palette-rowList'
                                        
                                        onClick={() => {
                                            Singleton.getInstance().InitializeColors(element.colorList)
                                            setActiveColorRow(index); // set the clicked row index
                                        }}
                                        style={{
                                            backgroundColor: activeColorRow === index ? 'rgb(190, 217, 239)' : 'white' ,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <h4 className='titleListRow'>{element.bundleName}</h4>
                                        {element.colorList.map((color) => {
                                            return (
                                                <div className='color-palette-item-list' style={{ backgroundImage: `url(${getServerImagesUrl(color.source)})` }}></div>
                                            )
                                        })}
                                    </div>
                                    <hr />
                                </>
                            )
                        })
                    }
                </>
                <br></br>
            </div>
        </>
        
    );
}