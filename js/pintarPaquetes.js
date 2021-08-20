async function pintarPaqTur () {
	const response = await fetch("http://localhost:3000/paquetes-turisticos-index");
	const result = await response.json();
	console.log(result);
	const contenedorPaquetes = document.querySelector(".paquetes");
	
	result.forEach((paquete) => {
		//si el paquete está activo
		if (paquete.activo) {
			//crear un div contenedor
			const container = document.createElement("div");
			container.classList.add("col-lg-4");
			container.classList.add("col-md-4");
			container.classList.add("col-sm-6");

			//crear foto
			const anchor = document.createElement("a");
			// anchor.href = paquete.imgUrl;
			anchor.classList.add("fh5co-card-item");
			anchor.classList.add("image-popup");

			//crear figure tag contenedor
			const figure = document.createElement("figure");

			//crear overlay
			const overlay = document.createElement("div");
			overlay.classList.add("overlay");
			//crear icono
			const icon = document.createElement("i");
			icon.classList.add("ti-plus");

			//unir icono y overlay
			overlay.appendChild(icon);

			//crear imagen responsive
			const imgRes = document.createElement("img");
			imgRes.src = paquete.imgUrl;
			imgRes.classList.add("img-responsive");

			//append overlay e imgRes al figure
			figure.appendChild(overlay);
			figure.appendChild(imgRes);

			//insertar figure en container
			container.appendChild(figure);

			//crear div textual
			const textDiv = document.createElement("div");
			textDiv.classList.add("fh5co-text");

			//crear h2 nombreDestino
			const nombreDestino = document.createElement("h2");
			nombreDestino.textContent = paquete.nombreDestino;

			//crear descripcion p
			const descripcion = document.createElement("p");
			descripcion.textContent = paquete.descripcion;

			//crear boton
			const p = document.createElement("p");
			const span = document.createElement("span");
			span.classList.add("btn");
			span.classList.add("btn-primary");
			span.textContent = "Seleccionar";
			p.appendChild(span);

			//insertar texto al div
			textDiv.appendChild(nombreDestino);
			textDiv.appendChild(descripcion);
			textDiv.appendChild(p);

			//insertar figure y textdiv en anchor
			anchor.appendChild(figure);
			anchor.appendChild(textDiv);

			//insertar anchor en continer
			container.appendChild(anchor);

			//insertar container en contenedorPaquetes
			contenedorPaquetes.appendChild(container);
            }
        });
    }

    pintarPaqTur();