import './experience-design-selection.component.css';

export const ExperienceDesignSelection = () => {
    return(

        <div className='h-100 mh-100 design-selection-container'>

            <div className="btn-group design-types-selection-group" role="group" aria-label="Design types selection group">

                <input type="radio" className="btn-check" name="designTypeSelector" id="designSelector1" />
                <label className="btn btn-sm btn-outline-primary rounded-0 rounded-top pb-0 px-3" htmlFor='designSelector1'>
                    Bricks
                </label>

                <input type="radio" className="btn-check" name="designTypeSelector" id="designSelector2" />
                <label className="btn btn-sm btn-outline-primary rounded-0 rounded-top pb-0" htmlFor='designSelector2'>
                    Cuadrado
                </label>

                <input type="radio" className="btn-check" name="designTypeSelector" id="designSelector3" />
                <label className="btn btn-sm btn-outline-primary rounded-0 rounded-top pb-0" htmlFor='designSelector3'>
                    Hexagonal
                </label>

            </div>

            <div className='mh-100 overflow-y-hidden'>
                <div className="border border-1 border-color-middle gap-2 p-3 h-100 design-thumbnails-grid">
                    <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
                    <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
                    <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
                    <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
                    <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
                    <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
                    <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
                    <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
                </div>
            </div>

        </div>

    );
}