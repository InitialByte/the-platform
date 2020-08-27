/* eslint @typescript-eslint/no-magic-numbers: 0, no-bitwise: 0, max-len: 0,
  @typescript-eslint/no-unsafe-member-access: 0, @typescript-eslint/no-unsafe-call: 0,
  @typescript-eslint/restrict-template-expressions: 0, @typescript-eslint/ban-ts-comment: 0,
  @typescript-eslint/no-unsafe-assignment: 0 */
// @ts-nocheck
export const webgl = (): string[] | null => {
  const fa2s = (gl, [fa1, fa2]): string => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    return `[${fa1},${fa2}]`;
  };

  const maxAnisotropy = (gl): number | null => {
    const ext = gl.getExtension('EXT_texture_filter_anisotropic');

    return ext
      ? gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) === 0 ?? 2
      : null;
  };

  const gl = document.createElement('canvas').getContext('webgl');

  if (!gl) {
    return null;
  }

  const result = [];
  const vShaderTemplate =
    'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}';
  const fShaderTemplate =
    'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}';
  const vertexPosBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
  const vertices = new Float32Array([
    -0.2,
    -0.9,
    0,
    0.4,
    -0.26,
    0,
    0,
    0.732134444,
    0,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  vertexPosBuffer.itemSize = 3;
  vertexPosBuffer.numItems = 3;
  const program = gl.createProgram();
  const vshader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vshader, vShaderTemplate);
  gl.compileShader(vshader);
  const fshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fshader, fShaderTemplate);
  gl.compileShader(fshader);
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  gl.useProgram(program);
  program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex');
  program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset');
  gl.enableVertexAttribArray(program.vertexPosArray);
  gl.vertexAttribPointer(
    program.vertexPosAttrib,
    vertexPosBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0,
  );
  gl.uniform2f(program.offsetUniform, 1, 1);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);

  try {
    result.push(gl.canvas.toDataURL());
  } catch {
    /* .toDataURL may be absent or broken (blocked by extension) */
  }

  result.push((gl.getSupportedExtensions() || []).join(';'));
  result.push(fa2s(gl, gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
  result.push(fa2s(gl, gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
  result.push(gl.getParameter(gl.ALPHA_BITS));
  result.push(!!gl.getContextAttributes().antialias);
  result.push(gl.getParameter(gl.BLUE_BITS));
  result.push(gl.getParameter(gl.DEPTH_BITS));
  result.push(gl.getParameter(gl.GREEN_BITS));
  result.push(maxAnisotropy(gl));
  result.push(gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
  result.push(gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
  result.push(gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
  result.push(gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
  result.push(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
  result.push(gl.getParameter(gl.MAX_TEXTURE_SIZE));
  result.push(gl.getParameter(gl.MAX_VARYING_VECTORS));
  result.push(gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
  result.push(gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
  result.push(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
  result.push(fa2s(gl, gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
  result.push(gl.getParameter(gl.RED_BITS));
  result.push(gl.getParameter(gl.RENDERER));
  result.push(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
  result.push(gl.getParameter(gl.STENCIL_BITS));
  result.push(gl.getParameter(gl.VENDOR));
  result.push(gl.getParameter(gl.VERSION));

  ['FLOAT', 'INT'].forEach((numType: string) =>
    ['VERTEX', 'FRAGMENT'].forEach((shader: string) =>
      ['HIGH', 'MEDIUM', 'LOW'].forEach((numSize: string) =>
        ['precision', 'rangeMin', 'rangeMax'].forEach((key: string) => {
          const format = gl.getShaderPrecisionFormat(
            gl[`${shader}_SHADER`],
            gl[`${numSize}_${numType}`],
          )[key];

          result.push(
            [
              shader.toLowerCase(),
              numSize.toLowerCase(),
              numType.toLowerCase(),
              key,
              format,
            ].join(''),
          );
        }),
      ),
    ),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};
