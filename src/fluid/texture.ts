import type { TextureInfo } from './types';

class Texture {
  public static ditheringTexture(gl: WebGL2RenderingContext) {
    return Texture.createTextureAsync(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAYFBMVEUAAAAHCgYQEg8YGRcfIB4mKCUtLy01NzQ9PzxFR0RNT0xVV1ReYF1maGZvcW54eneBg4CIioeNj4yTlZKcn5ymqKWvsq65u7jAw7/GyMXMz8vW2NXg4t/p7Ojy9fH///9XywrsAAAKk0lEQVRYwx2XV1LEQAxEJ+fkibYn+P63RMsXRQGL1CO9biF1ni6Lu6IKL53FfyYuZHcVx/PoHrbH9xZsL/i1pVxqYmQkG32xvXEd7kEt0xQ+9pq754Z1GrSIuyk8DHqqys1f0o1dA9No14HPZPo+NqfTlt9kRrSFrUuTtqmwcd8Wr+bJF/NMdhN5iK4UJ6HGdIm+ImTrV+R+KVFYEllidPuJ+DN8QetTDCpXb7IPl4f1EsZMfc/7BHqarN4ceqteyNvJCNPp/piKqO6n2ihnqr5f0+fItq7duyX0chaLYLOuj7nw7peuE6fPyLoNPjf5wkrolKDSS4/T7MFmkccMKHzhqz34Ym09ijW5PAlTPXxFt/nj4J/4q8lUsePowdORlfloO8iRdK/Y5/Cq28QzZD6+rog6L+Oz2EPpMjQ0j3oWt5O9qiMjB286VDxNboe6j8+7gZ4f4cW/hiQ8PveepEVLRxSTl6bdjkJ79CPviNZlv3gf5aLA0xexrqgPW1X2aXHjt52aXgoeJ9A89fvRu54kcNCHbCNoRb69qAj6bihSsWcQK3FxA13bq2/FDVP21HD3+mwzAk5euKhWdfOSd3MTo0PV9hYEJo9NzYS6n5XU6w2rd2JVB348EZM5ibtkq6mxX+KfzeuL0tc1uiPPICToKis9E2XfeTukr0iGMORkNM34svYnXq4e+/82WQ9qgyosSFT6Mu3IevqaUJw4mgSZ7SOPe+HDXjeSajgu6H2SW0QoatoPy3T6FvOx0IJLLEDTNnOc+51gKyaN/ILF2DPKKlZx8q1dcfvp7NcJXcTly6Rm+Auj8MrVyRRpq/Ga7WiLX9F7mBlEw8x8OLD9cJvQDrRNNKQr+K5mYPhwsjUaFd/qZP3S6L8qMcwUdm9DzH/5dvu5hp0XCcfN/AyVDGwCvPlmr8vfkxpHH6DANl/daESz2L3aQyYPj6FoUqGQJZvu92+gf3N8mmaw8lE0vZiV0yAm381h9j+5ypPmMW/z9AgVbV91duF1Ol6seh2DK7xfXKBDmdchqS8UCkodm/KoyC4jjiWj4GTmnScpAht20H4BCMXiMPlY7yXIsI1I4wcPuvpzI7vC6WmPF7gQmnRMHMBPN1+Dvp+YLYzzjN9LbwfvCSqryQFvaJf3pqoTpFkWjlpdelQ9PzvOm+iN3cPnuKQeJPz+qBvZyscC7uXDSQeWYD1OnuJFp45JriYwvTdbRLesXMtRJqIi3nUeeXVZ2XUiggkai0VA6arfC9VG0y4UkVHPN6ARl4VP9iC/HjGBo/btgjpeFo4vWa6L5zoiaf/SfAtPr8n6pg5tmHrPzUwSAAet9sHTR61v7BiAfHqAh/Yunu9JfQX4SnMUtt2cMDS+JfKCtoJjpY3HjlV1S5rSsV4yDdgj2D7TxNYDVxO7sjeanc+0C79ROuWFXdPPsbsroA6Z4RZXfLGPOz/EbxVvAfX7i6YjswPOvC5exYcGPalqhTcEffWS7BUHjUvbvM0h7Qx1s9AK77TulQ+bqtvw3rjJ/DG18RA6engxtlJHDkc3wlWNX6KxgR+V7RTVfeq1JzsYV1QDAKMRtVLAFbQ0n6Mdhi60oThqYnU8yY6FPJ/0sYnALsAdTotE/bZwm+6+wrdwxexH25VIvfbgr9QTl43A6UwBcbjsIc263L6Xe2OfwoEzfOIC9RM0G/tHB/fkFKCohFJi+S73BpQJe9PX9DyOGqQ5KR01nWkdLEtwE1I40IGs6w51qpaGZGbxrG8HbmHpQdH6KjyLGLCbx3mDUUmcW/oTdjc/A489q/ZSiWzM+0XxPNidKfb0D8Af8bk7fhbQSYnmZc8fnTbwbZF+CEsb28/jGWzV6xBmwMs7ZIAWSGLq4DUQKspcWxYziVss4dvXd5DypjYvd7KcTTzMHL5/hB3F7Ul8oVb1aloOzqC2bhJ0w/zrt6nbig1k2M2B6Sjxdh1pdquDwT2QEk64aZIbqsbv5wad14d8FGe4mW4ZL/qoNnWQEasbmvpCw4AMtYusThPW7IVB3/GYWDMEILyFYvAKtvKXhu0qOsElYBJYRGY64UkLCN4jCuSN6wsT+Dj551DzQt9LPqGOB5C1VD5FNzZFhx9niE9T+C9ue+v9wNSAvZ5b2JaHKRFWNrIJxkqvVvTBFknaErLiwScBlijEAtYcDINsvEbh5PeI0dhVsdyOn+7xWOoaNXQwbO5qQl27O+wRVfZjxyYhP530GPzQa6HeaPB5Kwg88HjoVRSY4ovh9lWfi5PAJPJVPkGaW+QFR4GlgFIloMyFDYY6IU9gml78hYfVeDtwRvxsshI87ri6Ogiyn7xmAf70+qk7wXiiAA5zVAMBFBtt1mMaFWXBF5iUZiGbNJTr1mJ7hICM/bE63pcMLBtgbHy/nsUohNv6mghxR945TutFJvILgx7+20BPimV3RmJu6g8WP5LDYvupAVeQJrGZCxZ0w5IDNPgGjx/69Q8yS151MtnfmdrSiJya+DvqbHoLEJERp9pN36v5mA+knUsByfS46IFUWLrKwLwwXAQigzIDZSd1u5RPFIzU7jv3B0YobKlh/zWfcrUAGRQyzFM5thuMy25NATHXbSR/UcP3CmgZ/g1YWnBSE7Yw1fGn4+Vg/zFgUn7dCdPlifT2jIwGJtDU6TUZRONnOz0VsHcd7DmFDHGdTlLx4lIv9Q8MqOVl0+Tm0PNqM6oXsqn9QWRPtKHHDLTW2TpWn9jAGpjycxyzK3z4ztGVO6i3bpQBmNjIL3MwYPwuSCAKCdDPiME2JJ9hvmz3G5+yAEBvoDcGoE3EzoWBhw+zX+nbPdhDoM5NU9k8KvDtgdgcGp1wIPzSMN4c6KUbHwYeElLsMOvnmjIuoh5w174udn/CAQEJinoH0tX67KNCT4sHc3U/2geMONfcjjQIPIJMWL7+Jn8gkgJ1XCQzlWAWog7y8X0ZDlVAUtA7t0/hzR5RsHK4JmEm3x0SE5wA3DTo+cyEH938Rop39Mm3WQSiyQ27c1f0ODqrTsQPu57AnlUGduHLsLTjyHmX5Zsq/QjDxr4qwpCI9Ymk0NewRqKCyHgHC+u7aS/y08QfdVGoUGziatDRMhKg0/zWaKdHK/SdwRNciyMJe65uDwaaHBhZDgHwGpG3p+4XvCerTfELW2DgOBtL4kdoVAwBAgfJj8ZwNj6Y+b7KG5GsBu+xkHzBDiXqkdgWn+trO5Wf45HkvpYoeuRvZiATZrcVBO9dFegMAkz3XYq6cAojcFH5dX/Mi6E8R5ZWDyryANkftYBSeYmN6AYFOP3hgLUNxd7dz/rwnjTceI1csuBlKitPBCzCfQAhjXiGrg8+yl8fQDlA/gVHwbcLIldQDWedpN2zigIXhkv9PcHOo/3moC8oAfcDmvS2Cz9Nj23YN9VZ2bQJ49mWhUzTD/FY2cTM2EGLi3Z8yYYvi2A4sYwKdSDVUXBj+PTzWptqgIs3me/Rsd0eguOdz8BfrL+UAjpBtIDl+uBmcX09GC5qaKdZODLAaq9wE75H4bRDMKDSXG+BUzks3yHxsO+G54GAQ4yYcCNOHopB3MG9OmB/6tGAPtleBRcZyHGtPuHaEJaaJn/ZG65irhfx8B93dzzKS38s/QFuMv6Ra+HZogAAAABJRU5ErkJggg==',
      gl,
    );
  }

  public static getTextureScale(
    texture: { width: number; height: number },
    width: number,
    height: number,
  ): { x: number; y: number } {
    return {
      x: width / texture.width,
      y: height / texture.height,
    };
  }

  private static createTextureAsync(
    url: string,
    gl: WebGL2RenderingContext,
  ): TextureInfo {
    const texture: WebGLTexture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      1,
      1,
      0,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      new Uint8Array([255, 255, 255]),
    );

    const obj: TextureInfo = {
      texture,
      width: 1,
      height: 1,
      attach(id: number) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };

    const image: HTMLImageElement = new Image();
    image.onload = () => {
      obj.width = image.width;
      obj.height = image.height;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    };
    image.src = url;

    return obj;
  }
}

export { Texture };
