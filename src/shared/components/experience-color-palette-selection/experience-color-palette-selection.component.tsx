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

        if(Singleton.getInstance().currentColorList?.length==0)
        {
            colorsBundle?.map((element,index)=>{
                if(index==0){
                    element.colorList.map((color,i)=>{
                        const node:any = document.getElementById(`circle-option${i+1}`);
                        if(node)node.style.backgroundImage=`url(https://corona.texelbit.com:9445/${color.source})`;
                    })
                };
                
            })
        }
        else
        {
            Singleton.getInstance().currentColorList?.map((element,index)=>{
                const node:any = document.getElementById(`circle-option${index+1}`);
                        if(node)node.style.backgroundImage=`url(https://corona.texelbit.com:9445/${element.source})`;
                
            })
        }

       
        

    },[colorsBundle]);
    
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

    const selectoptionBumble = (newIndex:number) =>{
        
        Singleton.getInstance().colorIndex=newIndex;

        for(let i =1; i<6;i++){

            if(objetcSelected.includes(i.toString())){
                const element = document.getElementById(`circle-option${i}`)
                if(element)element.style.border=`solid #0069B4 3px`
                sessionStorage.setItem('BumbleId',`circle-option${i}`)
            }else{
                const element = document.getElementById(`circle-option${i}`)
                if(element)element.style.border=`solid #0069B4 1px`
            }
        }
    }

    return(
        <>
           

           <TooltipMudi content='Corona te recomienda estas combinaciones.' visible={true} position='top'>
           <h3 className="color-middle fw-bold m-0 mb-3" style={{zIndex: 20,top: "-10%"}}>Paleta sugerida</h3>
           </TooltipMudi>

            <div className='optionsColorsList'>
                
                <br></br>
                <>
                    {
                        colorsBundle?.map((element)=>{
                            return(
                                <>
                                    <div className='color-palette-rowList' onClick={()=>{
                                        Singleton.getInstance().InitializeColors(element.colorList)
                                            element.colorList.map((color,i)=>{
                                                const node:any = document.getElementById(`circle-option${i+1}`);
                                                if(node)node.style.backgroundImage=`url(${getServerImagesUrl(color.source)})`;
                                            })
                                            hiddenListColores()
                                        }}>
                                        <h4 className='titleListRow'>{element.bundleName}</h4>
                                        { element.colorList.map((color)=>{
                                            return(
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