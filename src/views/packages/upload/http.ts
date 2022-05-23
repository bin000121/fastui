interface _header {
    token?: string;
    [key: string]: any
}

interface _myPost {
    url: string;
    header?: _header;
    body?: any;
    withCredentials?: boolean
}


import { isEmpty } from '/@/utils/utils'
const xhr = new XMLHttpRequest()

function myPost(option: _myPost): Promise<any> {
    let {
        url,
        header = {},
        body = {},
        withCredentials = false
    } = option
    xhr.open('POST', url, true)
    xhr.withCredentials = withCredentials
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    if (!isEmpty(header)) {
        for (let item in header) {
            xhr.setRequestHeader(item, header[item])
        }
    }

    xhr.send(body)

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) return

            if([200, 204, 206, 304].includes(xhr.status)) resolve(xhr.responseText as any)
            else reject(new Error('upload error'))
        }
        xhr.onerror = () => {
            reject()
        }
    })
}

export default myPost
