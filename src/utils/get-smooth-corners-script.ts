const getSmoothCornersScript = () => {
  const scriptContent = `
    class ReactSquirclePainter {
      static get inputProperties() {
        return ["--squircle-radius", "--squircle-border-color", "--background-color", "--squircle-border-width"];
      }

      squircle(a, b, nX = 4, nY) {
        nY = nY ?? nX;

        const nX2 = 2 / nX;
        const nY2 = nY ? 2 / nY : nX2;
        const steps = 360;
        const step = (2 * Math.PI) / steps;
        const points = t => {
          const cosT = Math.cos(t);
          const sinT = Math.sin(t);
          return {
            x: Math.abs(cosT) ** nX2 * a * Math.sign(cosT),
            y: Math.abs(sinT) ** nY2 * b * Math.sign(sinT)
          };
        };
        return Array.from({ length: steps }, (_, i) => points(i * step));
      }

      paint(ctx, geom, properties) {
        const [nX, nY] = properties
          .get("--squircle-radius")
          .toString()
          .replace(/ /g, "")
          .split(",");
        const backgroundColor = properties.get("--background-color").toString();
        let borderColor = properties.get("--squircle-border-color").toString();
        let borderWidth = properties.get("--squircle-border-width").toString();
    
        const width = geom.width / 2;
        const height = geom.height / 2;
    
        let smooth = this.squircle(
          width,
          height,
          parseFloat(nX, 10),
          parseFloat(nY, 10)
        );
    
        // Draw filled shape
        ctx.beginPath();
    
        smooth.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point.x + width, point.y + height);
          } else {
            ctx.lineTo(point.x + width, point.y + height);
          }
        });
    
        ctx.closePath();
        if(backgroundColor) {
          ctx.fillStyle = backgroundColor;
        }
        ctx.fill();

        if(borderWidth || borderColor) {
          borderWidth = borderWidth || 1;
          borderColor = borderColor || "#000";

          smooth = this.squircle(
            width - borderWidth * 0.385,
            height - borderWidth * 0.385,
            parseFloat(nX, 10),
            parseFloat(nY, 10)
          );
          ctx.translate(width, height); 
          ctx.beginPath();
          smooth.forEach((point, i) => {
            if (i === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
      
          ctx.closePath();
          ctx.lineWidth = borderWidth;
          ctx.strokeStyle = borderColor; // Set border color
          ctx.stroke();
        }
      }
    }

    registerPaint("react-squircle", ReactSquirclePainter);
`;

  return `data:application/javascript;charset=utf8,${encodeURIComponent(
    scriptContent
  )}`;
};

export default getSmoothCornersScript;
