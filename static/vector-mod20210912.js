window.addEventListener('load', init);

function init() {

    //サイズを指定
    const width = 800;
    const height = 450;

    //回転の基準となるベクトルを作成
    var Axis = {  
        "x" : new THREE.Vector3(1, 0, 0).normalize(),
        "y" : new THREE.Vector3(0, 1, 0).normalize(),
        "z" : new THREE.Vector3(0, 0, 1).normalize(),
        "y-z" : new THREE.Vector3(0, 1, 1).normalize()
    };

    //レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff);

    //シーンを作成
    const scene = new THREE.Scene();

    //カメラを作成
    const camera = new THREE.PerspectiveCamera(45, 800 / 450);
    camera.position.set(0, 0, +1000);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    //ベクトル描画
    const from_x = new THREE.Vector3(0, 0, 0);
    const to_x = new THREE.Vector3(0, 0, 1);
    const direction_x = to_x.clone().sub(from_x);
    const length_x = 100;
    const x_arrow = new THREE.ArrowHelper(direction_x.normalize(), from_x, length_x, 0x29b0da, 14, 14);
    scene.add(x_arrow);

    const from_y = new THREE.Vector3(0, 0, 0);
    const to_y = new THREE.Vector3(1, 0, 0);
    const direction_y = to_y.clone().sub(from_y);
    const length_y = 100;
    const y_arrow = new THREE.ArrowHelper(direction_y.normalize(), from_y, length_y, 0xda2932, 14, 14);
    scene.add(y_arrow);

    const from_z = new THREE.Vector3(0, 0, 0);
    const to_z = new THREE.Vector3(0, 1, 0);
    const direction_z = to_z.clone().sub(from_z);
    const length_z = 100;
    const z_arrow = new THREE.ArrowHelper(direction_z.normalize(), from_z, length_z, 0x9ceb43, 14, 14);
    scene.add(z_arrow);

    const from = new THREE.Vector3(0, 0, 0);
    const to = new THREE.Vector3(0, 1, 0);
    const direction = to.clone().sub(from);
    const length = 300;
    const arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 0xDF013A, 25, 20);
    scene.add(arrowHelper);

    //球を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    const material = new THREE.MeshLambertMaterial({color: 0xffffff, transparent: true, opacity: 0.4});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    //ワイヤフレーム描画
    const geo = new THREE.EdgesGeometry(sphere.geometry);
    const mat = new THREE.LineBasicMaterial({color: 0xBDBDBD,linewidth:2});
    const wireframe = new THREE.LineSegments(geo, mat);
    sphere.add(wireframe);
    
    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(20, 10, 30);
    scene.add(directionalLight);
    
    //レンダリング
    function tick() {
        sphere.rotation.y += 0.002;
        renderer.render(scene, camera); 
        requestAnimationFrame(tick);
    }

    tick();
    
    var flag = 0;
    
    var quaternion = arrowHelper.quaternion;
	var target = new THREE.Quaternion();
	
    //xゲート
    function xgate(){
       if(flag < Math.PI){
           target.setFromAxisAngle(Axis["z"], Math.PI/50);
           target.multiply(quaternion.clone());  
           quaternion.copy(target);  
           flag += Math.PI/50;
           requestAnimationFrame(xgate);
       }else{
           flag = 0;
       }
    }
	
	    //yゲート
    function ygate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["x"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(ygate);
        }else{
            flag = 0;
        }
     }

    //zゲート
    function zgate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["y"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(zgate);
        }else{
            flag = 0;
        }
    }

    //hゲート
    function hgate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["y-z"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(hgate);
        }else{
            flag = 0;
        }
    }

	//ttゲート
	function ttgate(){
        if(flag < Math.PI/4){
            target.setFromAxisAngle(Axis["y"], -Math.PI/48);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/48;
			requestAnimationFrame(ttgate);
			console.log(flag);
        }else{
            flag = 0;
		}
	}
	
	//ボタンクリック時のgeteの挙動の指定
	function setgate(gate){
		switch (gate){
			case 'x': xgate(); break;
			case 'y': ygate(); break;
			case 'z': zgate(); break;
			case 'h': hgate(); break;
			case 'tt': ttgate(); break;
		}
	}
	
	//offボタン見た目変更
	function btnoff(id){
		btn = document.getElementById(id);
		btn.style.backgroundColor="#eeeeee";
		btn.style.color="#aaaaaa";
		btn.style.pointerEvents = 'none';
	}
	
	//ボタンのランダム配置
	var elem = document.getElementById("sample");
	var childs = elem.childNodes; 
	var child = childs[0]; 
	//console.log(elem);
	console.log(childs);
	childs[0].setAttribute('class', 'greenBtn');
	childs[0].setAttribute('id', 'y2');
	childs[0].innerText = 'Y';
	childs[1].setAttribute('class', 'greenBtn');
	childs[1].setAttribute('id', 'z2');
	childs[1].innerText = 'Z';
	childs[2].setAttribute('class', 'greenBtn');
	childs[2].setAttribute('id', 'x2');
	childs[2].innerText = 'X';
		
	
	

    //xゲート
    document.getElementById('x').onclick = function xgate(){
       if(flag < Math.PI){
           target.setFromAxisAngle(Axis["z"], Math.PI/50);
           target.multiply(quaternion.clone());  
           quaternion.copy(target);  
           flag += Math.PI/50;
           requestAnimationFrame(xgate);
       }else{
           flag = 0;
       }
    }

    //yゲート
    document.getElementById('y').onclick = function ygate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["x"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(ygate);
        }else{
            flag = 0;
        }
     }

    //zゲート
    document.getElementById('z').onclick = function zgate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["y"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(zgate);
        }else{
            flag = 0;
        }
    }

    //hゲート
    document.getElementById('h').onclick = function hgate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["y-z"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(hgate);
        }else{
            flag = 0;
        }
    }

    //sゲート
    document.getElementById('s').onclick = function sgate(){
        if(flag < Math.PI/2){
            target.setFromAxisAngle(Axis["y"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(sgate);
        }else{
            flag = 0;
        }
    }

    //stゲート
    document.getElementById('st').onclick = function stgate(){
        if(flag < Math.PI/2){
            target.setFromAxisAngle(Axis["y"], -Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(stgate);
        }else{
            flag = 0;
        }
    }

    //tゲート
    document.getElementById('t').onclick = function tgate(){
        if(flag < Math.PI/4){
            target.setFromAxisAngle(Axis["y"], Math.PI/48);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/48;
            requestAnimationFrame(tgate);
        }else{
            flag = 0;
        }
    }

    //ttゲート
    document.getElementById('tt').onclick = function ttgate(){
        if(flag < Math.PI/4){
            target.setFromAxisAngle(Axis["y"], -Math.PI/48);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/48;
            requestAnimationFrame(ttgate);
        }else{
            flag = 0;
        }
	}
	
	// add 202109
    //xゲート
    document.getElementById('x2').onclick = function xgate(){
       if(flag < Math.PI){
           target.setFromAxisAngle(Axis["z"], Math.PI/50);
           target.multiply(quaternion.clone());  
           quaternion.copy(target);  
           flag += Math.PI/50;
           requestAnimationFrame(xgate);
       }else{
           flag = 0;
       }
    }

    //yゲート
    document.getElementById('y2').onclick = function ygate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["x"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(ygate);
        }else{
            flag = 0;
        }
     }

    //zゲート
    document.getElementById('z2').onclick = function zgate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["y"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(zgate);
        }else{
            flag = 0;
        }
    }

    //hゲート
    document.getElementById('h2').onclick = function hgate(){
        if(flag < Math.PI){
            target.setFromAxisAngle(Axis["y-z"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(hgate);
        }else{
            flag = 0;
        }
    }

    //sゲート
    document.getElementById('s2').onclick = function sgate(){
        if(flag < Math.PI/2){
            target.setFromAxisAngle(Axis["y"], Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(sgate);
        }else{
            flag = 0;
        }
    }

    //stゲート
    document.getElementById('st2').onclick = function stgate(){
        if(flag < Math.PI/2){
            target.setFromAxisAngle(Axis["y"], -Math.PI/50);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/50;
            requestAnimationFrame(stgate);
        }else{
            flag = 0;
        }
    }

    //tゲート
    document.getElementById('t2').onclick = function tgate(){
        if(flag < Math.PI/4){
            target.setFromAxisAngle(Axis["y"], Math.PI/48);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/48;
            requestAnimationFrame(tgate);
        }else{
            flag = 0;
        }
    }

	//ttゲート(p2)イベント
	//var tt2_flag = 0;
	var cntbtn = new Object();
	cntbtn["tt2"] = 0;
	//document.getElementById('tt2').addEventListener('click', function(){
	
	function setclickevent(id, gate){
		cntbtn[id] = 0;
		document.getElementById(id).onclick = function(){
			
			//2回目以降は何もしない
			if(cntbtn[id] > 0) return;
			
			//1回目の実行
			setgate(gate);
			
			//1回だけ押せるように変更
			cntbtn[id]++;
			btnoff(id);
		}
	}
	
	setclickevent("tt2", "tt");

	/*document.getElementById('tt2').onclick = function ttgate(){		
		
        if(flag < Math.PI/4){
            target.setFromAxisAngle(Axis["y"], -Math.PI/48);
            target.multiply(quaternion.clone());  
            quaternion.copy(target);  
            flag += Math.PI/48;
            requestAnimationFrame(ttgate);
        }else{
            flag = 0;
		}
		
		if(tt2_flag > 0) return;
		
		//1回だけ押せるように変更
		tt2_flag = 1;
			
		tt2 = document.getElementById("tt2");        
		tt2.style.backgroundColor="#eeeeee";
		tt2.style.color="#aaaaaa";
    }*/


    //はじめからボタン
    document.getElementById('start').onclick = function start(){
        location.reload();
    }
    
}