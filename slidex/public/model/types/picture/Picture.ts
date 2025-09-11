type Picture = {
    src: string;
}

function createPicture(src: string): Picture
{
    return {
        src: src,
    }
}

export type { Picture };
export {
    createPicture
}