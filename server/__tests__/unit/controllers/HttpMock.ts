export class MockRequest {
    public body: any
}

export class MockResponse {
    public status = (code: any) => this;
    public json = (data: any) => this;
}