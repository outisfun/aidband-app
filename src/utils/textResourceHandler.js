import { getPageResourceMap, addPageResourceText } from "./firebase";

export default class TextResourceHandler {
    constructor(pageName, lang) {
        this.pageName = pageName;
        this.lang = lang;
    }

    async getMap() {
        const map = await getPageResourceMap(this.pageName, this.lang);
        if (!map) map = {};
        console.log("Returning resource map", map);
        return map;
    }

    get(key, map) {
        console.log("TextResourceHandler.get input:", key, map, typeof(map));
        if (!key) return null;

        
        console.log(map);
        let resource = map[key];
        if (!resource) {
            console.log("No resource in map. Adding...");
            resource = key;
            map[key] = resource;
            addPageResourceText(this.pageName, this.lang, map, key, resource);
        }
        return resource;
    }
}