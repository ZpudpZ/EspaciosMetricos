// Importar la librería three.js
import * as THREE from 'https://cdn.skypack.dev/three@0.137.5';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.137.5/examples/jsm/controls/OrbitControls.js';

// Configuración básica de three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.getElementById('threeContainer').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
controls.update();

// Función para crear un punto en la escena
function createPoint(x, y, z, color) {
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    scene.add(sphere);
}

// Función para crear una línea entre dos puntos en la escena
function createLine(x1, y1, z1, x2, y2, z2) {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(x1, y1, z1));
    points.push(new THREE.Vector3(x2, y2, z2));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
}

// Función para calcular la distancia entre dos puntos en R3
function calculateAndRenderDistance() {
    // Limpiar la escena
    while (scene.children.length > 0) { 
        scene.remove(scene.children[0]); 
    }

    // Obtener los valores de las coordenadas
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const z1 = parseFloat(document.getElementById('z1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);
    const z2 = parseFloat(document.getElementById('z2').value);

    // Verificar que los valores sean números válidos
    if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) {
        document.getElementById('result').innerText = 'Por favor, ingresa valores numéricos válidos';
        return;
    }

    // Calcular la distancia usando la fórmula de distancia euclidiana
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));

    // Mostrar el resultado
    document.getElementById('result').innerText = `Distancia: ${distance.toFixed(2)}`;

    // Crear los puntos y la línea en la escena
    createPoint(x1, y1, z1, 0xff0000); // Punto 1 en rojo
    createPoint(x2, y2, z2, 0x00ff00); // Punto 2 en verde
    createLine(x1, y1, z1, x2, y2, z2); // Línea entre los puntos
}

// Hacer la función disponible en el ámbito global
window.calculateAndRenderDistance = calculateAndRenderDistance;

// Función de animación para actualizar la escena
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
