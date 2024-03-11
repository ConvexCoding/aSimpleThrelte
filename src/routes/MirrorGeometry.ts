import { LatheGeometry, Vector2 } from 'three'

export let radius = 5
export let ct = 2

type Options = {
  divisionsPerLensSeg?: number
  radialDivisions?: number
  axis?: 'x' | 'y' | 'z'
}

export class MirrorGeometry extends LatheGeometry {
  constructor(radius: number, ct: number, options: Options = {}) {
    const { divisionsPerLensSeg = 51, radialDivisions = 51, axis = 'z' } = options
    const points = genLensShellPoints(radius, ct, divisionsPerLensSeg)

    super(points, radialDivisions, 0, 2 * Math.PI)

    if (axis === 'x') {
      this.rotateZ(-Math.PI / 2)
    } else if (axis === 'z') {
      this.rotateX(Math.PI / 2)
    }
  }
}

function genLensShellPoints(radius: number, ct: number, divisionsPerLensSeg: number) {
  const pts1plus = []
  const pts2plus = []
  const stepSide1 = radius / (divisionsPerLensSeg - 1)
  const stepSide2 = radius / (divisionsPerLensSeg - 1)

  // define lens arc
  for (let i = 0; i < divisionsPerLensSeg; i++) {
    const r1 = i * stepSide1
    const r2 = i * stepSide2
    pts1plus.push(new Vector2(r1, 0))
    pts2plus.push(new Vector2(r2, ct))
  }
  // add flats - just in case - one extra point won't be missed (??)
  const halfDiameter = radius
  pts1plus.push(new Vector2(halfDiameter, 0))
  pts2plus.push(new Vector2(halfDiameter, ct))
  return pts1plus.concat(pts2plus.reverse())
}
