export function modalVideo (){

    const div = document.createElement('DIV')
    div.classList.add('modalVideo')
    div.innerHTML=`
        <div class="containerVideo">
            <h1 class="closeModalVideo">X</h1>
            <iframe class="modalVideo-video" width="100%" src="https://www.youtube.com/embed/rh6GneoJKZY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
        </div>
    `;
    div.querySelector('.closeModalVideo').addEventListener('click',()=> document.querySelector('.modalVideo').remove() )

    document.body.appendChild(div)
}