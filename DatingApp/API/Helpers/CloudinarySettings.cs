namespace API.Helpers
{
    public class CloudinarySettings
    {
        //Strongly typed configurations for type safety in classes
        public required string CloudName { get; set; }
        public required string ApiKey { get; set; }
        public required string ApiSecret { get; set; }
    }
}
