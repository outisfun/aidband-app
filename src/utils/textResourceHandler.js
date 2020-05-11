import { getPageResourceMap, addPageResourceText } from "./firebase";

export default class TextResourceHandler {
    constructor(pageName, lang) {
        this.pageName = pageName;
        this.lang = lang;
        this.loaded = false;
        this.map = {};
    }

    async loadTexts() {
        this.map = await getPageResourceMap(this.pageName, this.lang);
        if (!this.map) this.map = {};
        this.loaded = true;
    }

    async getMap() {
        const map = await getPageResourceMap(this.pageName, this.lang);
        if (!map) map = {};
        console.log("Returning resource map", map);
        return map;
    }

    get(key) {
        if (!key) return null;
        if (!this.loaded) return null;
        if (!this.map) return null;
        
        let resource = this.map[key];
        if (!resource) {
            console.log("No resource in map. Adding...");
            resource = key;
            this.map[key] = resource;
            addPageResourceText(this.pageName, this.lang, this.map, key, resource);
        }
        return resource;
    }
}