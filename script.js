// ============ LOADING SCREEN ============
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// ============ CUSTOM CURSOR ============
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

// ============ 3D SCENE (Three.js) ============
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('hero3d').appendChild(renderer.domElement);

// Create a geometric shape (TorusKnot looks cool)
const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ffcc, 
    wireframe: true,
    emissive: 0x00ffcc,
    emissiveIntensity: 0.3
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============ AUTO IMAGE HANDLER ============
// If image.jpeg is not found, hide the broken image and show the note
function handleMissingImage(img) {
    img.classList.add('hidden');
    console.log('Image not found. Add image.jpeg to assets/images/ folder.');
}

// ============ AOS INIT ============
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});