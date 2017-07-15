import htmlparser from 'htmlparser2';

export const html2json = (data) => {
  return new Promise((resolve, reject) => {
    const temp = [];
    const heights = [];
    const test = [];
    const ids = [];
    let tags = '';
    const parser = new htmlparser.Parser({
      onopentag(name, attribs) {
        // console.log(`${name}打开`);
        // console.log(name, attribs);
        if (name === 'img' && attribs.src) {
          temp.push(attribs.src);
          heights.push(attribs.height);
        }
        if (name === 'a' && attribs.href) {
          if (ids[ids.length - 1] !== attribs.href) {
            // console.log(attribs);
            ids.push(attribs.href);
          }
        }
        if (name === 'li') {
          tags = '';
        }
        tags += name;
      },
      ontext(text) {
        if (tags === 'lispanspanspanspanaimgema') {
          tags = '';
          test.push(text);
        }
      },
      // onclosetag(tagname) {
      //   // console.log(`${tagname}关闭`);
      //   // if (tagname === 'li') {
      //   //   temp.push(test);
      //   //   test.img = '';
      //   //   test.text = '';
      //   // }
      //   // if (tagname === 'script') {
      //   //   console.log("That's it?!");
      //   // }
      // },
      // oncomment(data2) {
      //   console.log(data2);
      // },
      onerror(error) {
        reject(error);
      },
      onend() {
        resolve(temp.map((i, index) => {
          return {
            img: i,
            text: test[index],
            height: heights[index],
            id: ids[index].substring(29, 35),
          };
        }));
      },
    }, {
      lowerCaseTags: false,
      decodeEntities: true,
    });
    parser.write(data);
    parser.end();
  });
};

export function parseQueryString(url) {
  const str = url.split('?')[1];
  const items = str.split('&');
  const result = {};
  let arr;
  for (let i = 0; i < items.length; i += 1) {
    arr = items[i].split('=');
    result[arr[0]] = arr[1];
  }
  return result;
}

