export class MockRequest {
    public body: object
    public headers: object
}

export class MockResponse {
    public status = (code: any) => this;
    public json = (data: any) => this;
}