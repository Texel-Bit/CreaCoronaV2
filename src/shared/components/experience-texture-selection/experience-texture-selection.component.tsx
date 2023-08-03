import './experience-texture-selection.component.css';

export const ExperienceTextureSelection = () => {
    return(
        <div className='h-100 mh-100 mw-100 textures-selection-container'>

            <div className="background-color-middle rounded-top text-center">
                <h6 className="m-0 color-white fw-normal">Con Diseño</h6>
            </div>

            <div className="border border-1 p-2 textures-containter-grid-content">

                <div className="textures-containter-grid gap-1">

                    <div style={{ backgroundImage: 'url(https://corona.texelbit.com:9445/uploads/DesignColors/c002.png)' }}></div>
                    <div style={{ backgroundImage: 'url(https://corona.texelbit.com:9445/uploads/DesignColors/c002.png)' }}></div>
                    <div style={{ backgroundImage: 'url(https://corona.texelbit.com:9445/uploads/DesignColors/c002.png)' }}></div>
                    <div style={{ backgroundImage: 'url(https://corona.texelbit.com:9445/uploads/DesignColors/c002.png)' }}></div>
                    <div style={{ backgroundImage: 'url(https://corona.texelbit.com:9445/uploads/DesignColors/c002.png)' }}></div>
                    <div style={{ backgroundImage: 'url(https://corona.texelbit.com:9445/uploads/DesignColors/c002.png)' }}></div>
                    <div style={{ backgroundImage: 'url(https://corona.texelbit.com:9445/uploads/DesignColors/c002.png)' }}></div>

                </div>
                
            </div>

        </div>
    );
}