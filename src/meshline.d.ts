// Type shim for meshline so TypeScript doesn't complain about JSX elements
// that are added via extend({ MeshLineGeometry, MeshLineMaterial })
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { Object3DNode, MaterialNode } from '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}
