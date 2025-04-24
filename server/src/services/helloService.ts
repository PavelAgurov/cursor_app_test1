interface HelloService {
  getMessage(): string;
}

const helloService: HelloService = {
  getMessage: (): string => {
    return 'Hello from the server!';
  }
};

export { helloService }; 