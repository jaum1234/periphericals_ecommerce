export class MockRequest {
    public body: object = {}
    public headers: object = {}
    public query: object = {}
    public params: object = {}
}

export class MockResponse {
    public status = (code: any) => this;
    public json = (data: any) => this;
    public end = () => this;
}