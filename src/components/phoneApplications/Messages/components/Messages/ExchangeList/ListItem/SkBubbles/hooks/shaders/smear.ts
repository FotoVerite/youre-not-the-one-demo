vec2 getCenter(in vec2 p, in float t){
return 0.5*sin( t*vec2(1.1,1.3)+vec2(0.0,0.5) );
}
vec2 deformUV(in vec2 p, in float t){
    p += getCenter(p,t);

	float a = atan( p.y, p.x );
    float r = length( p );
    
    float s = r * (1.0+0.5*cos(t*1.7));

    
    return 0.1*t + 0.05*p.yx + 0.05*vec2( cos(t+a*2.0),
                                          sin(t+a*2.0))/s;
}

vec3 deform( in vec2 p, in float t )
{
    return texture( iChannel0, 0.5*deformUV(p,t) ).xyz;
}

vec3 hueShift( vec3 color, float hueAdjust ){

    const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
    const vec3  kRGBToI      = vec3 (0.596, -0.275, -0.321);
    const vec3  kRGBToQ      = vec3 (0.212, -0.523, 0.311);

    const vec3  kYIQToR     = vec3 (1.0, 0.956, 0.621);
    const vec3  kYIQToG     = vec3 (1.0, -0.272, -0.647);
    const vec3  kYIQToB     = vec3 (1.0, -1.107, 1.704);

    float   YPrime  = dot (color, kRGBToYPrime);
    float   I       = dot (color, kRGBToI);
    float   Q       = dot (color, kRGBToQ);
    float   hue     = atan (Q, I);
    float   chroma  = sqrt (I * I + Q * Q);

    hue += hueAdjust;

    Q = chroma * sin (hue);
    I = chroma * cos (hue);

    vec3    yIQ   = vec3 (YPrime, I, Q);

    return vec3( dot (yIQ, kYIQToR), dot (yIQ, kYIQToG), dot (yIQ, kYIQToB) );

}

#define STEPS 5

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 q = fragCoord/iResolution.xy;
    vec2 p = -1.0 + 2.0*q;
    float tt = iTime*0.05;
    vec2 dd=deformUV(p,tt);
    
    vec3 col = vec3(0.0);
    for( int i=0; i<STEPS; i++ )
    {
        float t = tt + float(i)*0.005; 
        col += deform( p, t );
    }
    col /= float(STEPS);

	col *= 1.5*(0.5 + 0.5*pow( 16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y), 0.25 ));
    float ddd = length(-p-getCenter(p,tt));
    ddd = smoothstep(ddd,0.0,0.2);
    col = mix(col, hueShift(col, 5.0*tt+20.0*dd.x), ddd);
    fragColor = vec4( col, 1.0 );
}