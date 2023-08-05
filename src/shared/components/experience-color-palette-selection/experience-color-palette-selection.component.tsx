import { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa'
import './experience-color-palette-selection.component.css';
import Singleton from '../../../core/patterns/singleton';
import { getAllDesignColorsBundle } from '../../../core/services/design.service';
import { IColorBundle } from '../../../core/models/color/color-bundle.model';
import { IColor } from '../../../core/models/color/color.model';

export const ExperienceColorPaletteSelection = () => {

    console.log("Pallete selection ");
    
    const [colorsBundle, setColorBundles] = useState<IColorBundle[] | null >();

    let initFristLoad = true
    useEffect(() => {

        console.log( colorsBundle ,"Bundleeees ");
        if(initFristLoad){
            initFristLoad=!initFristLoad;
            colorsBundle?.map((element,index)=>{
                if(index==0){
                    element.colorList.map((color,i)=>{
                        const node:any = document.getElementById(`circle-option${i+1}`);
                        if(node)node.style.backgroundImage=`url(https://corona.texelbit.com:9445/${color.source})`;
                    })
                };
               
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
        console.log('hiddeit')
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

    const selectoptionBumble = () =>{
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

    return(<>
        <div className="p-1 w-100 d-flex align-items-center justify-content-between experience-color-palette-selection-container">
            <small className='seleccionSmall'>Selección</small>
            <div className='color-palette-row'>
                <div onClick={(e:any)=>{objetcSelected= e.target.id ; selectoptionBumble() }} id="circle-option1" className='color-palette-item rounded-circle' ></div>
                <div onClick={(e:any)=>{objetcSelected= e.target.id ; selectoptionBumble() }} id="circle-option2" className='color-palette-item rounded-circle' ></div>
                <div onClick={(e:any)=>{objetcSelected= e.target.id ; selectoptionBumble() }} id="circle-option3" className='color-palette-item rounded-circle' ></div>
                <div onClick={(e:any)=>{objetcSelected= e.target.id ; selectoptionBumble() }} id="circle-option4" className='color-palette-item rounded-circle' ></div>
                <div onClick={(e:any)=>{objetcSelected= e.target.id ; selectoptionBumble() }} id="circle-option5" className='color-palette-item rounded-circle' ></div>
            </div>
            <button type='button' className='btn btn-sm btn-primary select-color-palette-btn py-0 px-1'>
                <FaCaretDown />
            </button>
        </div>
        <div className='optionsColorsList hiddenList'>
            <br></br>
          
            <>
                {
                    colorsBundle?.map((element)=>{
                        return(<>
                        <div className='color-palette-rowList' onClick={()=>{
                            Singleton.getInstance().InitializeColors(element.colorList)
                                element.colorList.map((color,i)=>{
                                    const node:any = document.getElementById(`circle-option${i+1}`);
                                    if(node)node.style.backgroundImage=`url(https://corona.texelbit.com:9445/${color.source})`;
                                })
                                hiddenListColores()
                            }}>
                            <h4 className='titleListRow'>{element.bundleName}</h4>
                            { element.colorList.map((color)=>{
                                return(<>
                                    <div className='color-palette-item rounded-circle' style={{ backgroundImage: `url(https://corona.texelbit.com:9445/${color.source})` }}></div>
                                </>)
                            })} 
                            
                        </div>
                        <hr />
                        </>)
                    })
                }
            </>
    
            <br></br>
        </div>
        </>
        
    );
}