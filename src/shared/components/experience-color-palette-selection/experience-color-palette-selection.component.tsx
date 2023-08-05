import { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa'
import './experience-color-palette-selection.component.css';
import Singleton from '../../../core/patterns/singleton';
import { getAllDesignColorsBundle } from '../../../core/services/design.service';
import { IColorBundle } from '../../../core/models/color/color-bundle.model';
import { IColor } from '../../../core/models/color/color.model';

export const ExperienceColorPaletteSelection = () => {

    console.log("Pallete selection ");
    
    const [colorsBundle, setColorBundles] = useState<IColorBundle>();


    useEffect(() => {

        console.log(colorsBundle,"Bundleeees ");

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
                        console.log(Singleton.getInstance().selectedDesignType?.id,"  design type id!! ");

                        const CurrColorsSelected = await getAllDesignColorsBundle(
                            Singleton.getInstance().selectedDesignType?.id||1,
                            colorTypeId,
                            Singleton.getInstance().currentEnvironmentType?.id||1
                        );
                        

                        console.log("Curr color bundles ");

                        CurrColorsSelected.data.forEach((element: {idDesignColorBundle:any,DesignColorBundleName:any, DesignColorInBundle: any[]; }) => {

                            let colorArray:IColor[] = []; // initialize colorArray to an empty array
                        
                            element.DesignColorInBundle.forEach(color => {
                                let currentColor = Singleton.getInstance().getColorDataManager().getColorById(color.id);
                                if(currentColor)
                                    colorArray.push(currentColor);
                            })
                                                    
                            let currBundle:IColorBundle = {  // use '=' instead of '{'
                                id: element.idDesignColorBundle,
                                bundleName: element.DesignColorBundleName,
                                colorList: colorArray
                            }

                            Singleton.getInstance().AddBundle(currBundle);
                                             
                        }); 
                        

                        setColorBundles(CurrColorsSelected);
                        
                    } else {
                    }
                } else {
                }
            }
            
            
        };
    
        fetchColors();
    }, []);  // <-- Don't forget the dependencies array. Update it as per your requirements.
    
    useEffect(()=>{
        document.querySelector('.select-color-palette-btn')?.addEventListener('click',()=>{
            if(document.querySelector('.hiddenList')){
                console.log('removido')
                document.querySelector('.optionsColorsList')?.classList.remove('hiddenList')
            }else{
                console.log('aregado')
                document.querySelector('.optionsColorsList')?.classList.add('hiddenList')
            }
        })
    },[])
   

    return(<>
        <div className="p-1 w-100 d-flex align-items-center justify-content-between experience-color-palette-selection-container">
            <small>Selección</small>
            <div className='color-palette-row'>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
            </div>
            <button type='button' className='btn btn-sm btn-primary select-color-palette-btn py-0 px-1'>
                <FaCaretDown />
            </button>
        </div>
        <div className='optionsColorsList hiddenList'>
            <br></br>
          
                <div className='color-palette-rowList'>
                        <h4 className='titleListRow'>{}</h4>
                        <div className='color-palette-item rounded-circle' style={{ backgroundImage: `url(${null})` }}></div>
                        <div className='color-palette-item rounded-circle' style={{ backgroundImage: `url(${null})` }}></div>
                        <div className='color-palette-item rounded-circle' style={{ backgroundImage: `url(${null})` }}></div>
                        <div className='color-palette-item rounded-circle' style={{ backgroundImage: `url(${null})` }}></div>
                        <div className='color-palette-item rounded-circle' style={{ backgroundImage: `url(${null})` }}></div>
                </div>
                <hr />
    
            <br></br>
        </div>
        </>
        
    );
}